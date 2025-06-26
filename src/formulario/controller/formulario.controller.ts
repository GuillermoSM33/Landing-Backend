import { Body, Controller, Post } from '@nestjs/common'
import { FormularioService } from '../service/formulario.service'
import { CreateFormDto } from '../dto/formulario.dto'
import { RecaptchaService } from '../../recaptcha/recaptcha.service'

@Controller('formulario')
export class FormularioController {
  constructor(
    private readonly formularioService: FormularioService,
    private readonly recaptchaService: RecaptchaService
  ) {}

  @Post('createData')
  async createData(@Body() data: CreateFormDto & { recaptchaToken: string }) {
    const isValid = await this.recaptchaService.verifyToken(data.recaptchaToken)
    
    if (!isValid) {
      throw new Error('reCAPTCHA verification failed')
    }

    // Si pasa la verificación, procesar el formulario
    await this.formularioService.createData({
      nombre_completo: data.nombre_completo,
      correo: data.correo,
      telefono: data.telefono,
      mensaje: data.mensaje
    })

    return { success: true }
  }
}