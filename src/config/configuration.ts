// src/config/configuration.ts
import { registerAs } from '@nestjs/config';

export default registerAs('recaptcha', () => ({
  secretKey: process.env.RECAPTCHA_SECRET_KEY,
}));