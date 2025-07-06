import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly configService: ConfigService 
  ) {}

  async register(dto: RegisterDto) {
    const existingEmail = await this.userRepo.findOne({ where: { email: dto.email } });
    const existingUsername = await this.userRepo.findOne({ where: { username: dto.username } });

    if (existingEmail || existingUsername) {
      throw new ConflictException('El username o el email ya están registrados');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = this.userRepo.create({
      username: dto.username,
      email: dto.email,
      password: hashedPassword,
    });

    await this.userRepo.save(user);
    return { message: 'Usuario registrado exitosamente' };
  }

  async login(dto: LoginDto) {
    const user = await this.userRepo.findOne({
      where: [
        { email: dto.identifier },
        { username: dto.identifier },
      ],
    });

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const isValid = await bcrypt.compare(dto.password, user.password);
    if (!isValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const secret = this.configService.getOrThrow<string>('JWT_SECRET'); 
    const expiresIn = this.configService.get<string>('JWT_EXPIRES_IN') || '1d';

    const token = jwt.sign(
      { sub: user.id, username: user.username, email: user.email },
      secret as jwt.Secret, 
      { expiresIn: expiresIn as jwt.SignOptions['expiresIn'] } 
    );


    return { token };
  }

  async validateToken(token: string) {
    try {
      const secret = this.configService.getOrThrow<string>('JWT_SECRET'); // ✅ igual aquí
      return jwt.verify(token, secret);
    } catch {
      throw new UnauthorizedException('Token inválido');
    }
  }
}
