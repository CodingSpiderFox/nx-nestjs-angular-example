import { BaseException } from '@share/server/exception';

export class UserAlreadyExistException extends BaseException {
  constructor(args: { message?: string; error?: Error }) {
    super(args);
  }
}
