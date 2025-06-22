import { Body, Controller, Post } from '@nestjs/common';
import { FormularioService } from '../service/formulario.service';
import { CreateFormDto } from '../dto/formulario.dto';

@Controller('formulario')
export class FormularioController {
    constructor(private readonly formularioService: FormularioService) {}

    /**
     * Endpoint to create data in the Firebase database.
     * @param datatrated - The data to be stored in the database.
     * @returns A promise that resolves when the data is successfully created.
     */
    @Post('createData')
    async createData(@Body() datatrated: CreateFormDto): Promise<void> {
        await this.formularioService.createData(datatrated);
    }

}
