import { ConfigService } from '@nestjs/config';
import { Knex } from 'knex';

const configService = new ConfigService();

const knexConfig: Knex.Config = {
  client: 'pg',
  connection: {
    host: configService.getOrThrow('DB_HOST'),
    port: parseInt(configService.getOrThrow('DB_PORT')),
    user: configService.getOrThrow('DB_USER'),
    password: configService.getOrThrow('DB_PASSWORD'),
    database: configService.getOrThrow('DB_NAME'),
  },
  migrations: {
    directory: './src/migrations',
  },
  seeds: {
    directory: './src/seeds',
  },
};

export default knexConfig;
