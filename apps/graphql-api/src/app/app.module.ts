import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { allEntities } from '@share/common/entity';
import { DbConfig } from '@share/server/config';
import { join } from 'path';
import { environment } from '../environments/environment';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TodoModule } from './graphql/todo.module';

@Module({
  imports: [
    // https://docs.nestjs.com/techniques/configuration#custom-env-file-path
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    // https://docs.nestjs.com/techniques/database#typeorm-integration
    TypeOrmModule.forRoot({
      type: DbConfig.type,
      host: DbConfig.host,
      port: DbConfig.port,
      database: DbConfig.database,
      username: DbConfig.username,
      password: DbConfig.password,
      autoLoadEntities: true,
      synchronize: false,
      keepConnectionAlive: true,
      logging: true,
      entities: allEntities,
    }),
    // https://docs.nestjs.com/graphql/quick-start#getting-started-with-graphql--typescript
    GraphQLModule.forRoot({
      debug: false,
      playground: !environment.production,
      typePaths: ['libs/api-interfaces/schema/**/*.graphql'],
      definitions: {
        path: join(
          process.cwd(),
          'libs/api-interfaces/src/common/graphql-schema/graphql.ts'
        ),
        outputAs: 'class',
      },
      installSubscriptionHandlers: true,
      subscriptions: {
        keepAlive: 5000,
      },
    }),
    TodoModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
