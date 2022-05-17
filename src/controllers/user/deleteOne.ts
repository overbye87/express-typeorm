/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import dataSource from '../../db/dataSource';
import { User } from '../../db/entities/User';

const userRepository = dataSource.getRepository(User);

export const deleteOne = async (request: Request, response: Response, next: NextFunction) => {
  const userToRemove = await userRepository.findOneBy({ id: Number(request.params.id) });
  await userRepository.remove(userToRemove);
};
