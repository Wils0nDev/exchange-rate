import { Column, Entity, Index, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { IsString } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

@Entity()
@Index(['OriginalCurrency', 'FateCurrency'], { unique: true })
export class InformationRate {

    @ApiProperty()
    @PrimaryGeneratedColumn('increment')
    Id:number;

    @ApiProperty()
    @Column('text')
    OriginalCurrency : string;

    @ApiProperty()
    @Column('text')
    FateCurrency : string;
    
    @ApiProperty()
    @Column('float')
    ExchangeRate : number;
}
