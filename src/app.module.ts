import { Logger, Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeorm from './configs/typeorm';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService,
      ): Promise<TypeOrmModuleAsyncOptions> => {
        const config = configService.get('typeorm');

        if (!config) throw new Error('typeorm config not found');

        Logger.log(
          `Connecting to database: ${config.database}@${config.host}:${config.port}`,
          'TypeORM',
        );

        return config;
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
