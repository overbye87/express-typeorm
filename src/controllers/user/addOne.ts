/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import { Handler } from 'express';
import { DeepPartial } from 'typeorm';
import dataSource from '../../db/dataSource';
import { Role } from '../../db/entities/Role';
import { User } from '../../db/entities/User';
import { createHash } from '../../utils/hash';
import { myError } from '../../utils/myError';

const userRepository = dataSource.getRepository(User);
const roleRepository = dataSource.getRepository(Role);

export const addOne: Handler = async (req, res, next) => {
  try {
    console.log('\n');
    console.log('addOne', req.body);

    const candidate = await userRepository.findOneBy({
      email: req.body.email,
    });
    if (candidate) {
      throw myError({
        status: 401,
        message: `Email ${req.body.email} alredy exist`,
      });
    }
    const password = await createHash(req.body.password);
    const role = await roleRepository.findOne({
      where: {
        roleName: 'USER',
      },
    });
    const newUser: DeepPartial<User> = {
      email: req.body.email,
      password,
      login: req.body.login,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      role,
    };
    const user = userRepository.create(newUser);
    await userRepository.save(user);
    delete user.password;
    return res.json({
      data: user,
      message: 'User created successfully',
    });
  } catch (error) {
    next(error);
  }
};
