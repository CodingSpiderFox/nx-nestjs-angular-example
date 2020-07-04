import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { redisClient } from '@share/server/config';
import * as compression from 'compression';
import * as Store from 'connect-redis';
import { NextFunction, Request, Response } from 'express';
import * as exphbs from 'express-handlebars';
import * as session from 'express-session';
import * as handlebars from 'handlebars';
import { join } from 'path';
import { AppModule } from './app/app.module';
import { SessionConfig } from './app/config';
import { ExceptionsFilter } from './app/filter';
import { fieldErrors } from './app/handlebars/custom.helper';
import { LoginInterceptor } from './app/interceptor';

async function bootstrap() {
  const RedisStore = Store(session);

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // https://docs.nestjs.com/interceptors#binding-interceptors
  app.useGlobalInterceptors(new LoginInterceptor());

  // https://docs.nestjs.com/exception-filters#binding-filters
  app.useGlobalFilters(new ExceptionsFilter());

  // https://docs.nestjs.com/techniques/compression
  app.use(compression());

  // https://github.com/expressjs/session
  app.use(
    session({
      name: SessionConfig.name,
      secret: SessionConfig.secret,
      resave: false,
      saveUninitialized: false,
      store: new RedisStore({
        client: redisClient,
      }),
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        // Units are in milliseconds.
        maxAge: 1000 * 60 * 10,
      },
    })
  );

  // Make session referable in .hbs
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.locals.session = req.session;
    next();
  });

  // https://github.com/ericf/express-handlebars
  const hbs = exphbs.create({
    handlebars: allowInsecurePrototypeAccess(handlebars),
    extname: '.hbs',
    layoutsDir: __dirname + '/assets/views/layouts',
    partialsDir: __dirname + '/assets/views/partials',
    defaultLayout: 'layout',
    helpers: {
      fieldErrors: fieldErrors,
    },
  });
  app.engine('hbs', hbs.engine);
  app.set('view engine', 'handlebars');
  app.setViewEngine('hbs');

  // https://docs.nestjs.com/techniques/mvc
  app.useStaticAssets(join(__dirname, '..', 'admin', 'assets', 'static'));
  app.setBaseViewsDir(join(__dirname, '..', 'admin', 'assets', 'views'));

  const globalPrefix = 'admin';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 4000;
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
