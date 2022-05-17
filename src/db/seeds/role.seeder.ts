/* eslint-disable class-methods-use-this */
import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Role } from '../entities/Role';

export default class RoleSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
  ): Promise<void> {
    const roleRepository = dataSource.getRepository(Role);
    await roleRepository.insert([
      { roleName: 'INVALID' },
      { roleName: 'USER' },
      { roleName: 'ADMIN' },
    ]);
  }
}
