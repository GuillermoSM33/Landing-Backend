// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FormularioModule } from './formulario/formulario.module';
import { AuthModule } from './auth/auth.module';
import { RecaptchaModule } from './recaptcha/recaptcha.module';
import configuration from './config/configuration';
import recaptchaConfig, { slackConfig, emailConfig } from './config/configuration';
import { EmailModule } from './email/module/email.module';
// ENTITIES
import { User } from './auth/entities/user.entity';
import { Lead } from './formulario/entity/lead.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [recaptchaConfig, slackConfig, emailConfig],
    }),

    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: process.env.DATABASE_PATH || './db.sqlite',
      entities: [User, Lead],
      synchronize: false, // Solo en desarrollo
    }),

    FormularioModule,
    RecaptchaModule,
    AuthModule,
    EmailModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
