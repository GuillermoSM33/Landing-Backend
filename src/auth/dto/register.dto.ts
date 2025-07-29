import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'usuario@gmail.com', description: 'Correo electrónico del usuario' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'usuario123', description: 'Nombre de usuario' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: '12345678', description: 'Contraseña con mínimo 8 caracteres' })
  @MinLength(8)
  password: string;
}
