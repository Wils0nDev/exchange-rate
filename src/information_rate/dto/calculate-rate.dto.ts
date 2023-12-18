import { IsNumber, IsPositive, IsString, MinLength, isPositive } from "class-validator";

export class CalculateRateDto {

    @IsNumber()
    Amount : number;

    @IsString()
    @MinLength(1)
    OriginalCurrency : string;

    @IsString()
    @MinLength(1)
    FateCurrency : string;

  
}


