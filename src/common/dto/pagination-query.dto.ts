import {IsOptional, IsPositive} from "class-validator";

export class PaginationQueryDto {
    //if not using transformOptions->enableImplicitConversion set tu true in validation pipe in main.ts
    //the type in every property need to be defined  using @Type decorator like : @Type(() => Number)
    @IsOptional()
    @IsPositive()
    limit: number;

    @IsOptional()
    @IsPositive()
    offset: number;
}
