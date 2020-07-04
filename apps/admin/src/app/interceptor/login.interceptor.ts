import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { SessionModel } from '../model';

@Injectable()
export class LoginInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const path = request.route.path;

    const excludes = [
      '/admin',
      '/admin/',
      '/admin/login',
      '/admin/logout',
      '/admin/encrypt',
      '/admin/error'
    ];
    if (excludes.includes(path)) {
      return next.handle();
    }

    const session: SessionModel = request.session;
    if (!session?.login) {
      throw new UnauthorizedException('not logged in.');
    }

    return next.handle();
  }
}
