// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FormularioModule } from './formulario/formulario.module';
import recaptchaConfig, { slackConfig, emailConfig } from './config/configuration';
import { EmailModule } from './email/module/email.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [recaptchaConfig, slackConfig, emailConfig],
    }),
    FormularioModule,
    EmailModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
