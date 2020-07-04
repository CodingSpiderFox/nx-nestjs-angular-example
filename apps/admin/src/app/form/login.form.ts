import { IsNotEmpty, MaxLength } from 'class-validator';

export class LoginForm {
  @IsNotEmpty()
  @MaxLength(50)
  readonly username: string;

  @IsNotEmpty()
  @MaxLength(191)
  readonly password: string;
}
