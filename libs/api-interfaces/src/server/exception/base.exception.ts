export class BaseException {
  message?: string;
  cause?: Error;
  constructor(args: { message?: string; cause?: Error }) {
    this.message = args.message;
    this.cause = args.cause;
  }
}
