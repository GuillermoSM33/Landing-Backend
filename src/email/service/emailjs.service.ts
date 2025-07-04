import { Injectable } from "@nestjs/common";
import { CreateFormDto } from "src/formulario/dto/formulario.dto";
import { createEmailParameters } from "../parameters/template";
import axios from "axios";
import { access } from "fs";
import { HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class EmailJsService {
    constructor(private readonly httpService: HttpService, private readonly configService: ConfigService) {}
    async sendEmail(data: CreateFormDto){
        const template_params = createEmailParameters(data);
        const response = await axios.post(
            'https://api.emailjs.com/api/v1.0/email/send',
            {
                service_id: this.configService.get<string>('email.serviceId'),
                template_id: this.configService.get<string>('email.templateId'),
                user_id: this.configService.get<string>('email.userId'),
                //access_token: this.configService.get<string>('email.accessToken'),
                template_params: template_params
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data;
    }
}