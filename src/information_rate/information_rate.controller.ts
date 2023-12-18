import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { InformationRateService } from './information_rate.service';
import { CreateInformationRateDto } from './dto/create-information_rate.dto';
import { UpdateInformationRateDto } from './dto/update-information_rate.dto';
import { CalculateRateDto } from './dto/calculate-rate.dto';

@Controller('information-rate')
export class InformationRateController {
  constructor(private readonly informationRateService: InformationRateService) {}

  @Post()
  create(@Body() createInformationRateDto: CreateInformationRateDto) {
    console.log(createInformationRateDto)
    return this.informationRateService.create(createInformationRateDto);
  }

  @Get()
  findAll() {
    return this.informationRateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.informationRateService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id',ParseIntPipe) id: number, @Body() updateInformationRateDto: UpdateInformationRateDto) {
    return this.informationRateService.update(+id, updateInformationRateDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.informationRateService.remove(id);
  }

  @Post('calculate')
  calculate(@Body() calculateRateDto: CalculateRateDto) {
    return this.informationRateService.calculate(calculateRateDto)
  }
}
