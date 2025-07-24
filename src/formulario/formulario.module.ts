import { Module } from '@nestjs/common';
import { FormularioService } from './service/formulario.service';
import { FormularioController } from './controller/formulario.controller';
import { RecaptchaModule } from '../recaptcha/recaptcha.module';
import { SlackNotificationService } from 'src/slack/service/slack.service';
import { HttpModule } from '@nestjs/axios';
import { EmailJsService } from 'src/email/service/emailjs.service';
import { Lead } from './entity/lead.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Lead]),
    RecaptchaModule,
    HttpModule,
  ],
  providers: [
    FormularioService,
    SlackNotificationService,
    EmailJsService
  ],
  controllers: [FormularioController],
})
export class FormularioModule {}
