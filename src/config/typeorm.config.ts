import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const dbConfig = config.get('db');

export const typeOrmConfig : TypeOrmModuleOptions = {
    type : dbConfig.type,
    host : dbConfig.host,
    port : dbConfig.port,
    username : dbConfig.username,
    password : dbConfig.password,
    database : 'world01',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize : process.env.TYPEORM_SYNC || dbConfig.synchronize
}