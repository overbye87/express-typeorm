/* eslint-disable class-methods-use-this */
import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '../entity/User';
import { Role } from '../entity/Role';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
  ): Promise<void> {
    const roleRepository = dataSource.getRepository(Role);
    const role = await roleRepository.findOne({
      where: {
        roleName: 'USER',
      },
    });
    const userRepository = dataSource.getRepository(User);
    await userRepository.insert([
      {
        email: 'caleb.barrows@gmail.com',
        password: 'password',
        firstName: 'Caleb',
        lastName: 'Barrows',
        login: 'Caleb',
        role,
      },
    ]);
  }
}
