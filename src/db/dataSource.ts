import 'reflect-metadata';
import { DataSource } from 'typeorm';

const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'overbye',
  password: 'overbye',
  database: 'overbye_db',
  synchronize: false,
  logging: false,
  entities: [`${__dirname}/entities/**/*.{ts,js}`],
  migrations: [`${__dirname}/migrations/*.{ts,js}`],
});

export default dataSource;
