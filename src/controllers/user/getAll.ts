/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import { Handler } from 'express';
import dataSource from '../../db/dataSource';
import { User } from '../../db/entities/User';

const userRepository = dataSource.getRepository(User);

export const getAll: Handler = async (req, res, next) => {
  try {
    console.log('\n');
    console.log('getAllUsers', req.body);

    const users = await userRepository.find();
    // eslint-disable-next-line no-param-reassign
    users.forEach((user) => delete user.password);
    return res.json({
      data: users,
      message: 'Users retrieved successfully',
    });
  } catch (error) {
    next(error);
  }
};
