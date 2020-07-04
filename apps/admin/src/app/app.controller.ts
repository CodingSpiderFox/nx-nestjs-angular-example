import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  Session,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { Response } from 'express';
import { LoginException } from './exception';
import { LoginForm } from './form';
import { SessionModel } from './model';
import { UserService } from './user/user.service';

@Controller()
export class AppController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  async index(@Session() session: SessionModel, @Res() response: Response) {
    if (session.login) {
      response.redirect('/admin/user/');
      return;
    }
    response.render('pages/index', {});
  }

  @Post('/login')
  @UsePipes(new ValidationPipe())
  async login(
    @Body() loginForm: LoginForm,
    @Session() session: SessionModel,
    @Res() response: Response
  ) {
    const userEntity = await this.userService.getUser(
      loginForm.username,
      loginForm.password
    );
    if (!userEntity) {
      throw new LoginException({
        message: 'Incorrect username or password.'
      });
    }
    session.login = true;
    response.redirect('/admin/user');
  }

  @Get('/logout')
  logout(@Session() session: any, @Res() response: Response) {
    session.destroy();
    response.redirect('/admin/');
  }
}
