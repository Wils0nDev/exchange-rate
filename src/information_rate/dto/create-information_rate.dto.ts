import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsPositive, IsString, MinLength, isPositive } from "class-validator";

export class CreateInformationRateDto {
    
    @ApiProperty()
    @IsString()
    @MinLength(1)
    OriginalCurrency : string;

    @ApiProperty()
    @IsString()
    @MinLength(1)
    FateCurrency : string;

    @ApiProperty()
    @IsNumber()
    @IsPositive()
    ExchangeRate : number;
}


