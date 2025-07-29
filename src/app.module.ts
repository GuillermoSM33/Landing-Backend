// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FormularioModule } from './formulario/formulario.module';
import { AuthModule } from './auth/auth.module';
import { RecaptchaModule } from './recaptcha/recaptcha.module';
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
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Lead],
      synchronize: true, 
    }),

    FormularioModule,
    RecaptchaModule,
    AuthModule,
    EmailModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
