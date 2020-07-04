import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@share/common/entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async getUser(username: string, password: string): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: {
        username: username,
        password: UserEntity.encryptPassword(password),
      },
    });
  }
}
