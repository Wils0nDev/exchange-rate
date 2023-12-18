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
      const information = await this.InformationRateRepository.find()
      return  information;
   
  }

  async findOne(id: number) {
 
      const information = await this.InformationRateRepository.findOneBy({Id: id})
      if(!information)  throw new NotFoundException(`Tasa de cambio con id ${id} no existe`)
      return  information;

 
  }

  async update(id: number, updateInformationRateDto: UpdateInformationRateDto) {
    const information = await this.InformationRateRepository.preload({
      Id:id,
      ...updateInformationRateDto
    });
    if(!information) throw new NotFoundException(`Tasa de cambio con id ${id} no existe`);
    await this.InformationRateRepository.save(information);
    return information;
  } 

  async remove(id: number) {
    const information = await this.findOne(id);
    const resp = await this.InformationRateRepository.remove(information);
    if(resp) return {ok:true, message : 'Elimiando correctamente'};
    return resp
  }

  async calculate({OriginalCurrency,FateCurrency,Amount}: CalculateRateDto) {
        const {ExchangeRate} = await this.InformationRateRepository.findOneBy({
          OriginalCurrency,
          FateCurrency
        }) 
        const amount = Amount * ExchangeRate;
        return {amount};
   
  }

  private handleExceptions(error:any){
    if(error.code == '23505')
      throw new BadRequestException(error.detail)
    this.logger.error(error)
    throw new InternalServerErrorException('Unexpected error, check server logs!')
  }


}
