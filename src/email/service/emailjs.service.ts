import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { CreateFormDto } from 'src/formulario/dto/formulario.dto';
import { createEmailParameters } from '../parameters/template';

@Injectable()
export class EmailJsService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'mail.privateemail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'support@thinkguille.space',
        pass: 'Alisson050125#',
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  async sendEmail(data: CreateFormDto) {
    const { name, email, message, html, title } = createEmailParameters(data);

    const mailOptions = {
      from: `"${name}" <support@thinkguille.space>`,
      to: email,
      subject: title,
      text: message,
      html: html,
    };

    return await this.transporter.sendMail(mailOptions);
  }
}
