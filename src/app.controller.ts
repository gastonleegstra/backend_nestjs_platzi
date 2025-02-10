import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';

import { Public } from './auth/decorators/public.decorator';
import { ApiKeyGuard } from './auth/guards/api-key.guard';

@UseGuards(ApiKeyGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Public()
  @Get('public')
  getPrivate(): string {
    return 'Hello World! Public';
  }

  @Public()
  @Get('nest')
  getNest(): string {
    return 'Hello World! Nest version 11';
  }
}
