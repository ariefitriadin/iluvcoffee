import { Test, TestingModule } from '@nestjs/testing';
import { CoffeesService } from './coffees.service';
import {Connection, Repository} from "typeorm";
import {getRepositoryToken} from "@nestjs/typeorm";
import {Flavor} from "./entities/flavor.entity";
import {Coffee} from "./entities/coffee.entity";
import {COFFEE_BRANDS} from "./coffees.constants";
import { NotFoundException } from "@nestjs/common";
import {tryCatch} from "rxjs/internal-compatibility";
import exp from "constants";

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
});

describe('CoffeesService', () => {
  let service: CoffeesService;
  let coffeeRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
          CoffeesService,
        { provide: Connection, useValue: {}},
        {
          provide: getRepositoryToken(Flavor),
          useValue: createMockRepository(),
        },
        { provide: getRepositoryToken(Coffee),
          useValue: createMockRepository(),
        },
        { provide: COFFEE_BRANDS, useValue: {}},
     ],
    }).compile();

    service = module.get<CoffeesService>(CoffeesService);
    coffeeRepository = module.get<MockRepository>(getRepositoryToken(Coffee));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    describe('When coffee with ID Exist', () => {
      it('should return the coffee object', async () => {
        const coffeeId = 1;
        const expectedCoffee = {};
        coffeeRepository.findOne.mockReturnValue(expectedCoffee);
        const coffee = await service.findOne(coffeeId);
        expect(coffee).toEqual(expectedCoffee);
      });
    });

    describe('otherwise', () => {
      it('should throw the "NotFoundException"', async (done) => {
        const coffeeId = 1;
        coffeeRepository.findOne.mockReturnValue(undefined);
        try {
          await service.findOne(coffeeId).then(done());
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          expect(err.message).toEqual(`Coffee #${coffeeId} not found`);
        }
      });
    });

  });
});
