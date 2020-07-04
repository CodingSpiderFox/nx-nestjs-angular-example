import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { allEntities } from '@share/common/entity';
import { DbConfig } from '@share/server/config';
import { AppController } from './app.controller';
import { EncryptModule } from './encrypt/encrypt.module';
import { UserModule } from './user/user.module';

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
    UserModule,
    EncryptModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
