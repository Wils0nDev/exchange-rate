import { PartialType } from '@nestjs/mapped-types';
import { CreateInformationRateDto } from './create-information_rate.dto';

export class UpdateInformationRateDto extends PartialType(CreateInformationRateDto) {}
