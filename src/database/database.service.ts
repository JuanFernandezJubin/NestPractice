import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { ConnectionOptions } from 'typeorm';
import { Configuration } from '../config/config.keys';

export const databaseProviders = [
    TypeOrmModule.forRootAsync({
        //Imports credentials of our enviroments variables with the inject.
        imports: [ConfigModule],
        inject: [ConfigService],
        async useFactory(config: ConfigService) {
            //UseFactory: Create our connection object with the required properties.
            return {
                // ssl: true, if you work with a cloud db
                type: 'postgres' as 'postgres',
                host: config.get(Configuration.HOST),
                username: config.get(Configuration.USERNAME),
                password: config.get(Configuration.PASSWORD),
                database: config.get(Configuration.DATABASE),
                port: 5444,
                entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                migrations: [__dirname + '/migrations/*{.ts,.js}']
            } as ConnectionOptions
        }
    })
];