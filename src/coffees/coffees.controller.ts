import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from '@nestjs/common';
import { CoffeesService} from "./coffees.service";
import {CreateCoffeeDto} from "./dto/create-coffee.dto";
import {UpdateCoffeeDto} from "./dto/update-coffee.dto";
import {PaginationQueryDto} from "../common/dto/pagination-query.dto";
import { Public } from '../common/decorators/public.decorator';
import {ParseIntPipe} from "../common/pipes/parse-int.pipe";

@Controller('coffees')
export class CoffeesController {
    constructor(private readonly coffeeService: CoffeesService) {}

    @Public()
    @Get()
    async findAll(@Query() paginationQuery: PaginationQueryDto) {
        // await new Promise(resolve => setTimeout(resolve, 5000)); //for test timeout error
        return this.coffeeService.findAll(paginationQuery);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        console.log(id);
        return this.coffeeService.findOne(id);
    }

    @Post()
    create(@Body() createCoffeeDto: CreateCoffeeDto) {
       return this.coffeeService.create(createCoffeeDto);
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
        return this.coffeeService.update(id, updateCoffeeDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.coffeeService.remove(id);
    }
}
