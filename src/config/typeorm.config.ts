import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mariadb',
  host: 'localhost',
  port: 3307,
  username: 'root',
  password: '',
  database: 'managetasks',
  entities: [__dirname + '../**/*.entity.ts'],
  synchronize: true, // not good in Production
};
