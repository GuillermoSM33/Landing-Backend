import { Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { CreateFormDto } from 'src/formulario/dto/formulario.dto'
import { buildSlackContactMessage } from 'src/slack/build/slack_message_builder'
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SlackNotificationService {
    constructor(private readonly httpService: HttpService, private readonly configService: ConfigService) {}
    async sendMessageToSlack(data: CreateFormDto) {
        const webhookUrl = this.configService.get<string>('slack.webhookUrl')!;
        const slackMessage = buildSlackContactMessage(data);
        await this.httpService.axiosRef.post(webhookUrl, { text: slackMessage });
    }
}