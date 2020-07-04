import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger
} from '@nestjs/common';
import { Response } from 'express';
import { LoginException, UserAlreadyExistException } from '../exception';
import { ValidationError } from '../model';

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // by instance type
    if (exception instanceof LoginException) {
      const loginException = exception as LoginException;
      Logger.warn(exception);
      response.status(HttpStatus.UNAUTHORIZED).render('pages/index', {
        errorMessage: loginException.message
      });
      return;
    } else if (exception instanceof UserAlreadyExistException) {
      const userAlreadyExistException = exception as UserAlreadyExistException;
      Logger.warn(exception);
      response.status(HttpStatus.UNAUTHORIZED).render('pages/user/register', {
        errorMessage: userAlreadyExistException.message
      });
      return;
    }

    // by status code
    switch (status) {
      case HttpStatus.BAD_REQUEST:
        // validation error
        const validationError = ((errors: any[]) => {
          if (!errors) {
            return undefined;
          }
          const v = new ValidationError();
          errors.forEach(error => {
            const property = error.property;
            const messages = Object.values<string>(error.constraints);
            v.addError(property, messages);
          });
          return v;
        })(exception?.message?.message);

        Logger.warn(exception.message);
        response.status(status).render('pages/index', {
          errorMessage: `${exception?.message?.error}`,
          validationError: validationError
        });
        break;
      case HttpStatus.INTERNAL_SERVER_ERROR:
        Logger.error(exception.message);
        response.status(status).render('pages/index', {
          errorMessage: `${exception?.message?.error}`
        });
        break;
      default:
        Logger.warn(exception.message);
        response.status(status).render('pages/index', {
          errorMessage: `${exception?.message?.error}`
        });
        break;
    }
  }
}
