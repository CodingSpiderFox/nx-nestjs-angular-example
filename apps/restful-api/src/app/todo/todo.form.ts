import { IsISO8601, IsNotEmpty, MaxLength } from 'class-validator';

export class TodoForm {
  @IsNotEmpty()
  @MaxLength(50)
  readonly title: string;

  @IsNotEmpty()
  @IsISO8601()
  readonly deadline: Date;
}
