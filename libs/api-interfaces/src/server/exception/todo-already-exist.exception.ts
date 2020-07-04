import { BaseException } from './base.exception';

export class TodoAlreadyExistException extends BaseException {
  constructor(args: { message?: string; error?: Error }) {
    super(args);
  }
}
