import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateInformationRateDto } from './dto/create-information_rate.dto';
import { UpdateInformationRateDto } from './dto/update-information_rate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { InformationRate } from './entities/information_rate.entity';
import { Repository } from 'typeorm';
import { CalculateRateDto } from './dto/calculate-rate.dto';

@Injectable()
export class InformationRateService {
  private readonly logger = new Logger('InformationRateService')
  constructor(
    @InjectRepository(InformationRate)
    private readonly InformationRateRepository : Repository<InformationRate>
  ) { }
  async create(createInformationRateDto: CreateInformationRateDto) {
    try {
        const information = this.InformationRateRepository.create(createInformationRateDto)
        await this.InformationRateRepository.save(information)
        return information;
    } catch (error) {
      this.handleExceptions(error)
    }
  }

  async findAll() {
   try {
      const information = await this.InformationRateRepository.find()
      return  information;
   } catch (error) {
    console.log(error)
    this.handleExceptions(error)
   }
  }

  async findOne(id: number) {
    //try {

      const information = await this.InformationRateRepository.findOneBy({Id: id})
      if(!information)  throw new NotFoundException(`Tasa de cambio con id ${id} no existe`)
      return  information;

    // } catch (error) {
    //   console.log(error)
    //   this.handleExceptions(error)
    // }
  }

  async update(id: number, updateInformationRateDto: UpdateInformationRateDto) {
    const information = await this.InformationRateRepository.update(id,updateInformationRateDto)
    return information
  } 

  async remove(id: number) {
    const information = await this.findOne(id)
    await this.InformationRateRepository.remove(information)
    
  }

  async calculate(calculateRateDto: CalculateRateDto) {
    try {
        const information = await this.InformationRateRepository.findOneBy({
          OriginalCurrency : calculateRateDto.OriginalCurrency,
          FateCurrency : calculateRateDto.FateCurrency
        }) 
        const amount = calculateRateDto.Amount * information.ExchangeRate;
        return {amount};
    } catch (error) {
      this.handleExceptions(error)
    }
  }

  private handleExceptions(error:any){
    if(error.code == '23505'){
      throw new BadRequestException(error.detail)
    }
    if(error.code == '22P02'){
      throw new BadRequestException(error.detail)
    }
    
    this.logger.error(error)
    throw new InternalServerErrorException('Unexpected error, check server logs!')
  }


}
