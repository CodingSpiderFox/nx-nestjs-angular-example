import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { redisClient } from '@share/server/config';
import * as compression from 'compression';
import * as Store from 'connect-redis';
import * as session from 'express-session';
import { AppModule } from './app/app.module';
import { SessionConfig } from './app/config';
import { ExceptionsFilter } from './app/filter';
import { LoggingInterceptor } from './app/interceptors';

async function bootstrap() {
  const RedisStore = Store(session);

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // https://docs.nestjs.com/recipes/swagger#openapi-swagger
  const swaggerOptions = new DocumentBuilder()
    .setTitle('TODO RESTFul-API')
    .setDescription('List of APIs for the TODO application.')
    .setVersion('1.0')
    .addTag('todo')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('swagger', app, swaggerDocument);

  // https://docs.nestjs.com/interceptors#binding-interceptors
  app.useGlobalInterceptors(new LoggingInterceptor());

  // https://docs.nestjs.com/techniques/validation#auto-validation
  app.useGlobalPipes(
    new ValidationPipe({
      forbidUnknownValues: true,
    })
  );

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
        maxAge: 1000 * 20,
      },
    })
  );

  // https://docs.nestjs.com/techniques/security#cors
  app.enableCors({
    origin: ['http://localhost:4200'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Origin', 'Authorization', 'Accept', 'Content-Type'],
    credentials: false,
    maxAge: 3600,
  });

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3100;
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
