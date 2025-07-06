import { IsNotEmpty } from 'class-validator'

export class LoginDto {
  @IsNotEmpty()
  identifier: string // username o email

  @IsNotEmpty()
  password: string
}
