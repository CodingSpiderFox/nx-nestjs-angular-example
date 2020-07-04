import { IsNotEmpty, MaxLength } from 'class-validator';

export class UserForm {
  @IsNotEmpty()
  @MaxLength(50)
  readonly username: string;

  @IsNotEmpty()
  @MaxLength(191)
  readonly password: string;
}
