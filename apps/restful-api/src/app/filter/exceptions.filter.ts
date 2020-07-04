import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ApiErrorResponsePayload } from '@share/common/payload';
import { TodoAlreadyExistException } from '@share/server/exception';

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // by instance type
    if (exception instanceof TodoAlreadyExistException) {
      const todoAlreadyExistException = exception as TodoAlreadyExistException;
      Logger.warn(exception);
      const payload: ApiErrorResponsePayload = {
        statusCode: HttpStatus.BAD_REQUEST,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: todoAlreadyExistException.message,
      };
      response.status(HttpStatus.BAD_REQUEST).json(payload);
      return;
    }

    // by status code
    switch (status) {
      case HttpStatus.INTERNAL_SERVER_ERROR: {
        Logger.error(exception);
        const payload: ApiErrorResponsePayload = {
          statusCode: status,
          timestamp: new Date().toISOString(),
          path: request.url,
          message: exception.message,
        };
        response.status(status).json(payload);
        break;
      }
      default: {
        Logger.warn(exception);
        const payload: ApiErrorResponsePayload = {
          statusCode: status,
          timestamp: new Date().toISOString(),
          path: request.url,
          message: exception.message,
        };
        response.status(status).json(payload);
        break;
      }
    }
  }
}
