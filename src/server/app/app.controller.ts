import { Controller, Request, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('private')
  getPrivate(@Request() req) {
    return req.user;
  }
}
