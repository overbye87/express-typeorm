/* eslint-disable no-unused-vars */
import { Handler } from 'express';
import dataSource from '../../db/dataSource';
import { User } from '../../db/entities/User';

const userRepository = dataSource.getRepository(User);

export const check: Handler = async (request, response, next) => {
  return userRepository.findOneBy({
    id: Number(request.params.id),
  });
};
