import { Module } from '@nestjs/common';
import { InformationRateService } from './information_rate.service';
import { InformationRateController } from './information_rate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InformationRate } from './entities/information_rate.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [InformationRateController],
  providers: [InformationRateService],
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      InformationRate
    ])
  ]
})
export class InformationRateModule {}
