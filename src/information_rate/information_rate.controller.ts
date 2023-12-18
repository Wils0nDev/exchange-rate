import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { InformationRateService } from './information_rate.service';
import { CreateInformationRateDto } from './dto/create-information_rate.dto';
import { UpdateInformationRateDto } from './dto/update-information_rate.dto';
import { CalculateRateDto } from './dto/calculate-rate.dto';
import { AuthGuard } from '@nestjs/passport';
import { InformationRate } from './entities/information_rate.entity';


@ApiTags('InformationRate')
@Controller('information-rate')
export class InformationRateController {
  constructor(private readonly informationRateService: InformationRateService) {}

  @Post()
  @UseGuards(AuthGuard())
  @ApiResponse({status:201, description: 'Exchange rate was created',type: InformationRate}, )
  @ApiResponse({status:400, description: 'Bad request'})
  @ApiResponse({status:403, description: 'Forbiden, Token related'})
  create(@Body() createInformationRateDto: CreateInformationRateDto) {
    console.log(createInformationRateDto)
    return this.informationRateService.create(createInformationRateDto);
  }

  @Get()
  @UseGuards(AuthGuard()  )
  findAll() {
    return this.informationRateService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  findOne(@Param('id') id: string) {
    return this.informationRateService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard()  )
  update(@Param('id',ParseIntPipe) id: number, @Body() updateInformationRateDto: UpdateInformationRateDto) {
    return this.informationRateService.update(id, updateInformationRateDto);
  }

  @Delete('remove/:id')
  @UseGuards(AuthGuard()  )
  remove(@Param('id', ParseIntPipe) id: number) {
    const resp = this.informationRateService.remove(id)
    return resp;
  }

  @Post('calculate')
  @UseGuards(AuthGuard())
  calculate(@Body() calculateRateDto: CalculateRateDto) {
    return this.informationRateService.calculate(calculateRateDto)
  }
}
