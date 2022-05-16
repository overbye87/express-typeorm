/* eslint-disable no-unused-vars */
import { Handler } from 'express';
import { AppDataSource } from '../../db/dataSource';
import { User } from '../../db/entity/User';

const userRepository = AppDataSource.getRepository(User);

export const check: Handler = async (request, response, next) => {
  return userRepository.findOneBy({
    id: Number(request.params.id),
  });
};
