import { Column, Entity, Index, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { IsString } from 'class-validator';

@Entity()
@Index(['OriginalCurrency', 'FateCurrency'], { unique: true })
export class InformationRate {

    @PrimaryGeneratedColumn('increment')
    Id:number;

    @Column('text')
    OriginalCurrency : string;

    @Column('text')
    FateCurrency : string;

    @Column('float')
    ExchangeRate : number;
}
