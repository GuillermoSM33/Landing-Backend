import { Module } from '@nestjs/common';
import { FormularioService } from './service/formulario.service';
import { FormularioController } from './controller/formulario.controller';

@Module({
  providers: [FormularioService],
  controllers: [FormularioController],
})
export class FormularioModule {}
