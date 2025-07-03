import { Module } from '@nestjs/common';
import { FormularioService } from './service/formulario.service';
import { FormularioController } from './controller/formulario.controller';
import { RecaptchaModule } from '../recaptcha/recaptcha.module';

@Module({
  providers: [FormularioService],
  controllers: [FormularioController],
  imports: [RecaptchaModule]
})
export class FormularioModule {}
