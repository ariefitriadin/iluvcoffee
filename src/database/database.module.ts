import {DynamicModule, Module} from '@nestjs/common';
import {ConnectionOptions, createConnection} from "typeorm";

@Module({})

// Improved Dynamic Module way of creating CONNECTION provider
export class DatabaseModule {
    static register(options: ConnectionOptions): DynamicModule {
        return {
            module: DatabaseModule,
            providers: [
                {
                    provide: 'CONNECTION',
                    useValue: createConnection(options),
                }
            ]
        }
    }
}
