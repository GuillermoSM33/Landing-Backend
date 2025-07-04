import {CreateFormDto} from 'src/formulario/dto/formulario.dto'

export function buildSlackContactMessage(data: CreateFormDto): string {
    return `Has recibido un nuevo mensaje desde la aplicación:
    
    El usuario: ${data.nombre_completo}
    Con correo: ${data.correo}
    Y telefono: ${data.telefono}
    Ha escrito el siguiente mensaje: ${data.mensaje}`.trim();
}