import { Module } from '@nestjs/common';
import { InformationRateService } from './information_rate.service';
import { InformationRateController } from './information_rate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InformationRate } from './entities/information_rate.entity';

@Module({
  controllers: [InformationRateController],
  providers: [InformationRateService],
  imports: [
    TypeOrmModule.forFeature([
      InformationRate
    ])
  ]
})
export class InformationRateModule {}
