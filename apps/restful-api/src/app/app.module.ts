import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { allEntities } from '@share/common/entity';
import { DbConfig, RedisConfig } from '@share/server/config';
import * as redisStore from 'cache-manager-redis-store';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TodoModule } from './todo/todo.module';
import { UsersModule } from './users/users.module';

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
    // https://docs.nestjs.com/techniques/caching#different-stores
    CacheModule.register({
      store: redisStore,
      host: RedisConfig.host,
      port: RedisConfig.port,
    }),
    TodoModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    // https://docs.nestjs.com/techniques/caching#global-cache
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    AppService,
  ],
})
export class AppModule {}
