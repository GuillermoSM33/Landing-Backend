// src/recaptcha/recaptcha.service.ts
import { Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { firstValueFrom } from 'rxjs'

@Injectable()
export class RecaptchaService {
  constructor(private readonly httpService: HttpService) {}

  async verifyToken(token: string): Promise<boolean> {
    const secret = '6LeCpm4rAAAAAAfMC63gaOkH-EpIeQXN6JY7hb4R' // Reemplaza con tu clave secreta
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`

    try {
      const response = await firstValueFrom(this.httpService.post(url))
      return response.data.success && response.data.score > 0.5 // Ajusta el score según necesites
    } catch (error) {
      console.error('Error verifying reCAPTCHA:', error)
      return false
    }
  }
}