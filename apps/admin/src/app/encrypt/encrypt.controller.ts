import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { EncryptService } from './encrypt.service';

@Controller()
export class EncryptController {
  constructor(private readonly encryptService: EncryptService) {}

  @Get('/encrypt')
  @Render('pages/encrypt')
  encrypt() {}

  @Post('/encrypt')
  @Render('pages/encrypt')
  encryptPassword(@Body('value') value: string) {
    if (!value) {
      return;
    }
    return {
      value: value,
      encrypted: this.encryptService.encryptPassword(value)
    };
  }
}
