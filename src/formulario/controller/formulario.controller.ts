import { Body, Controller, Post } from '@nestjs/common'
import { FormularioService } from '../service/formulario.service'
import { CreateFormDto } from '../dto/formulario.dto'
import { RecaptchaService } from '../../recaptcha/recaptcha.service'
import { SlackNotificationService } from '../../slack/service/slack.service'
import { EmailJsService } from 'src/email/service/emailjs.service'
import { Get } from '@nestjs/common'


@Controller('formulario')
export class FormularioController {
  constructor(
    private readonly formularioService: FormularioService,
    private readonly recaptchaService: RecaptchaService,
    private readonly slackService: SlackNotificationService,
    private readonly emailService: EmailJsService
  ) {}

  @Get('all')
async getAllLeads() {
  return this.formularioService.getAllLeads();
}

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

    await this.slackService.sendMessageToSlack(data);

    await this.emailService.sendEmail(data);

    return { success: true }
  }
}