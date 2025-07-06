// src/config/configuration.ts
import { registerAs } from '@nestjs/config';

export default registerAs('recaptcha', () => ({
  secretKey: process.env.RECAPTCHA_SECRET_KEY,
}));

export const slackConfig = registerAs('slack', () => ({
  webhookUrl: process.env.SLACK_WEBHOOK_URL,
}));

export const emailConfig = registerAs('email', () => ({
  serviceId: process.env.EMAILJS_SERVICE_ID,
  templateId: process.env.EMAILJS_TEMPLATE_ID,
  userId: process.env.EMAILJS_USER_ID,
  accessToken: process.env.EMAILJS_ACCESS_TOKEN,
}));
