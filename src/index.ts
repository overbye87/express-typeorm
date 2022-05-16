/* eslint-disable no-console */
import { runSeeder } from 'typeorm-extension';
import { AppDataSource } from './db/dataSource';
import { config } from './config';
import app from './app';
import UserSeeder from './db/seeder/user.seeder';
import RoleSeeder from './db/seeder/role.seeder';

const PORT = process.env.PORT ?? config.port;

(async () => {
  await AppDataSource.initialize();

  // await runSeeder(AppDataSource, RoleSeeder);
  // await runSeeder(AppDataSource, UserSeeder);

  app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}...`);
  });
})();
