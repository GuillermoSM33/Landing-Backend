import { CreateFormDto } from "src/formulario/dto/formulario.dto";

export function createEmailParameters(data: CreateFormDto) {
    const { nombre_completo, correo, telefono, mensaje } = data;

    const plainText = `
Solicitud de contacto desde la aplicación:

Nombre: ${nombre_completo}
Correo: ${correo}
Teléfono: ${telefono}

Mensaje:
${mensaje}
    `.trim();

    const html = `
        <html>
            <body style="font-family: Arial, sans-serif; color: #333;">
                <h2>Solicitud de contacto desde la aplicación</h2>
                <p><strong>Nombre:</strong> ${nombre_completo}</p>
                <p><strong>Correo:</strong> ${correo}</p>
                <p><strong>Teléfono:</strong> ${telefono}</p>
                <p><strong>Mensaje:</strong></p>
                <blockquote style="background:#f9f9f9; padding:10px; border-left:5px solid #ccc;">
                    ${mensaje}
                </blockquote>
            </body>
        </html>
    `;

    return {
        email: 'support@thinkguille.space', 
        name: nombre_completo,
        message: plainText,
        html: html,
        title: 'Nuevo mensaje desde la aplicación',
    };
}
