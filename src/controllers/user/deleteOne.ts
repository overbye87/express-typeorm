/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import { Handler } from 'express';
import dataSource from '../../db/dataSource';
import { User } from '../../db/entities/User';
import { myError } from '../../utils/myError';

const userRepository = dataSource.getRepository(User);

export const deleteOne: Handler = async (req, res, next) => {
  try {
    console.log('\n');
    console.log('deleteOne', req.params);

    const user = await userRepository.findOneBy(
      { id: Number(req.params.id) },
    );

    if (!user) {
      return res.json({
        data: false,
        message: `No user with id: ${req.params.id}`,
      });
    }
    await userRepository.remove(user);
    return res.json({
      data: true,
      message: `User with id: ${req.params.id} removed successfully`,
    });
  } catch (error) {
    next(error);
  }
};
