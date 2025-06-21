import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FormularioModule } from './formulario/formulario.module';

@Module({
  imports: [FormularioModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
