import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class CreateFormDto{

    @IsNotEmpty()
    @IsString()
    nombre_completo: string;
    
    @IsNotEmpty()
    @IsEmail()
    correo: string;

    @IsNotEmpty()
    @IsString()
    telefono: string;

    @IsNotEmpty()
    @IsString()
    mensaje: string;
}