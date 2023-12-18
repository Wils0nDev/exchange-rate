import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InformationRateModule } from './information_rate/information_rate.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type:'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true, //carga las entidades que vamos definiendo poco a poco
      synchronize: true //En produccion false, este parametro sirve para hacer migraciones
    }),
    InformationRateModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
