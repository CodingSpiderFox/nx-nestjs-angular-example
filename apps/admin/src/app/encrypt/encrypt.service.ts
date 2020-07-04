import { Injectable } from '@nestjs/common';
import { UserEntity } from '@share/common/entity';

@Injectable()
export class EncryptService {
  encryptPassword(value: string): string {
    return UserEntity.encryptPassword(value);
  }
}
