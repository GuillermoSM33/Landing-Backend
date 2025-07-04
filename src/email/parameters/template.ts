import { CreateFormDto } from "src/formulario/dto/formulario.dto";

export function createEmailParameters(data: CreateFormDto) {
    return {
        email: data.correo,
        name: data.nombre_completo,
        message: data.mensaje,
        title: 'Request In App'
    };
}
