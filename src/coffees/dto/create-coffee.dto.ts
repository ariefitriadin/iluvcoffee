import {IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateCoffeeDto {
    @ApiProperty({ description: 'The Name of a coffee'})
    @IsString()
    readonly name: string;

    @ApiProperty({ description: 'The Brand of the coffee'})
    @IsString()
    readonly brand: string;

    @ApiProperty({ example: []})
    @IsString({each: true})
    readonly flavors: string[];
}
