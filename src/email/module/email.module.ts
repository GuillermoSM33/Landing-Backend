import { Module } from "@nestjs/common";
import e from "express";
import { EmailJsService } from "../service/emailjs.service";
import { ConfigModule } from "@nestjs/config";
import { HttpModule } from "@nestjs/axios";

@Module({
    imports: [ConfigModule, HttpModule],
    providers: [EmailJsService],
    exports: [EmailJsService],
})
export class EmailModule {}