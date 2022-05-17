/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import dataSource from '../../db/dataSource';
import { User } from '../../db/entities/User';

const userRepository = dataSource.getRepository(User);

export const add = async (request: Request, response: Response, next: NextFunction) => {
  try {
    console.log('addUser', request.body);
    // const user = await userRepository.findOneBy({
    //   id: Number(request.params.id),
    // });
    return response.json({
      status: true,
      user: request.body,
      message: 'User retrieved successfully',
    });
  } catch (error) {
    return response
      .status(400)
      .json({ status: false, message: 'Can not get user' });
  }
};
