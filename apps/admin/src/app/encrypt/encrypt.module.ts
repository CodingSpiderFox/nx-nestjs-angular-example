import { Module } from '@nestjs/common';
import { EncryptController } from './encrypt.controller';
import { EncryptService } from './encrypt.service';

@Module({
  imports: [],
  controllers: [EncryptController],
  providers: [EncryptService]
})
export class EncryptModule {}
