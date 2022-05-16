import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Role } from './entity/Role';
import { User } from './entity/User';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'mydb',
  synchronize: false,
  logging: false,
  entities: [Role, User],
  migrations: [],
  subscribers: [],
});
