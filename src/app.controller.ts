import { Controller, Get } from '@nestjs/common';

@Controller('api/v1')
export class AppController {
  @Get()
  getHello(): string {
    return 'Welcome to Food Court!';
  }
}
