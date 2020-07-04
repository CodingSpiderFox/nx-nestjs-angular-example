import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '@share/common/entity';
import { LoginResponsePayload } from '@share/common/payload';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const userEntity: UserEntity = await this.usersService.getUser(
      username,
      password
    );
    if (userEntity) {
      const { password, ...result } = userEntity;
      return result;
    }
    return null;
  }

  async login(user: any): Promise<LoginResponsePayload> {
    const payload = { username: user.username, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
