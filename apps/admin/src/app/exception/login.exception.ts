import { BaseException } from '@share/server/exception';

export class LoginException extends BaseException {
  constructor(args: { message?: string; error?: Error }) {
    super(args);
  }
}
