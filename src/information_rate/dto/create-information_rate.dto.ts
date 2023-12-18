import { IsNumber, IsPositive, IsString, MinLength, isPositive } from "class-validator";

export class CreateInformationRateDto {

    @IsString()
    @MinLength(1)
    OriginalCurrency : string;

    @IsString()
    @MinLength(1)
    FateCurrency : string;

    @IsNumber()
    @IsPositive()
    ExchangeRate : number;
}


