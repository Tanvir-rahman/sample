import { ConnectionOptions } from 'typeorm';
import path from 'path';

const isCompiled: any = path.extname(__filename).includes('js');

export default {
    name: 'db_default',
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3307,
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'murmurDB',
    synchronize: !process.env.DB_SYNC,
    logging: !process.env.DB_LOGS,
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 2000,
    entities: [
        `src/entities/**/*.${isCompiled ? 'js' : 'ts'}`
    ],
    migrations: [
        `src/migration/**/*.${isCompiled ? 'js' : 'ts'}`
    ],
    cli: {
        'entitiesDir': 'src/entity',
        'migrationsDir': 'src/migration',
    },
} as ConnectionOptions; 