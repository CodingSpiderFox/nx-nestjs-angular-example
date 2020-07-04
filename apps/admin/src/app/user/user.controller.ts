import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Render,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { UserAlreadyExistException } from '../exception';
import { UserForm } from '../form/user-form';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  @Render('pages/user')
  async renderUser() {
    return {
      users: await this.userService.getUsers()
    };
  }

  @Get('/register')
  @Render('pages/user/register')
  async renderRegisterUser() {}

  @Post('/register')
  @Render('pages/user')
  @UsePipes(new ValidationPipe())
  async registerUser(@Body() userForm: UserForm) {
    let message: string;
    let errorMessage: string;
    await this.userService
      .registerUser(userForm.username, userForm.password)
      .then(() => {
        message = `Username=[${userForm.username}] has been successfully registered`;
      })
      .catch((e: UserAlreadyExistException) => {
        errorMessage = e.message;
      });
    return {
      users: await this.userService.getUsers(),
      message: message,
      errorMessage: errorMessage
    };
  }

  @Get('/edit/:id')
  @Render('pages/user/edit')
  async renderEditUser(@Param('id') id: number) {
    const users = await this.userService.getUserById(id);
    return {
      id: id,
      users: users
    };
  }

  @Post('/edit/:id')
  @Render('pages/user')
  @UsePipes(new ValidationPipe())
  async editUser(@Param('id') id: number, @Body() userForm: UserForm) {
    let message: string;
    let errorMessage: string;
    await this.userService
      .editUser(id, userForm.username, userForm.password)
      .then(() => {
        message = `Username=[${userForm.username}] has been successfully edited`;
      })
      .catch((e: UserAlreadyExistException) => {
        errorMessage = e.message;
      });
    return {
      users: await this.userService.getUsers(),
      message: message,
      errorMessage: errorMessage
    };
  }

  @Get('/delete/:id')
  @Render('pages/user')
  async deleteUser(@Param('id') id: number) {
    await this.userService.deleteUsers(id);
    return {
      users: await this.userService.getUsers()
    };
  }
}
