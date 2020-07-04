import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@share/common/entity';
import { DeleteResult, InsertResult, Not, Repository } from 'typeorm';
import { UserAlreadyExistException } from '../exception';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async getUserById(id: number): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async getUser(username: string, password: string): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: {
        username: username,
        password: UserEntity.encryptPassword(password),
      },
    });
  }

  async isRegisteredUserId(id: number, username: string): Promise<boolean> {
    return (
      1 <=
      (await this.userRepository.count({
        where: {
          id: Not(id),
          username: username,
        },
      }))
    );
  }

  async isRegisteredUserName(username: string): Promise<boolean> {
    return (
      1 <=
      (await this.userRepository.count({
        where: {
          username: username,
        },
      }))
    );
  }

  async getUsers(): Promise<UserEntity[]> {
    return this.userRepository.find({
      order: {
        updatedAt: 'DESC',
      },
    });
  }

  async registerUser(username: string, password: string): Promise<UserEntity> {
    const isRegistered = await this.isRegisteredUserName(username);
    if (isRegistered === true) {
      throw new UserAlreadyExistException({
        message: `Username=[${username}] is already registered.`,
      });
    }
    const insertResult: InsertResult = await this.userRepository.insert(
      new UserEntity({
        username: username,
        password: password,
      })
    );
    return insertResult.generatedMaps[0] as UserEntity;
  }

  async editUser(
    id: number,
    username: string,
    password: string
  ): Promise<UserEntity> {
    const isRegistered = await this.isRegisteredUserId(id, username);
    if (isRegistered === true) {
      throw new UserAlreadyExistException({
        message: `username=[${username}] was already registered.`,
      });
    }
    return await this.userRepository.save(
      new UserEntity({
        id: id,
        username: username,
        password: password,
      })
    );
  }

  async deleteUsers(id: number): Promise<number> {
    const deleteResult: DeleteResult = await this.userRepository.delete(id);
    return deleteResult.affected || 0;
  }
}
