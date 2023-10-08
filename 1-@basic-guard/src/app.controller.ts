import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';
import { Request as RequestType } from "express";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(AuthGuard)
  @Get("/access")
  withoutGuard(@Request() req: RequestType) {
    const user = req["user"];
    const payload = {
      message: this.appService.secretMessage(),
      user,
    }
    return payload;
  }
}
