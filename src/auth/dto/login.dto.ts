import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'usuario@gmail.com', description: 'Email o nombre de usuario' })
  @IsNotEmpty()
  identifier: string;

  @ApiProperty({ example: '123456', description: 'Contraseña del usuario' })
  @IsNotEmpty()
  password: string;
}
