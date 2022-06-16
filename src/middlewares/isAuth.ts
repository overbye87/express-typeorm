import { Handler, Request } from 'express';
import dataSource from '../db/dataSource';
import { User } from '../db/entities/User';
import { myError } from '../utils/myError';
import { verifyToken } from '../utils/token';

const userRepository = dataSource.getRepository(User);

export const isAuth: Handler = async (req, res, next) => {
  try {
    let token = req.headers['x-access-token'];
    if (!token) token = (req.headers.authorization || '').replace(/^Bearer /, '');

    const { id } = verifyToken(String(token));

    const user = await userRepository.findOneBy({ id });
    if (!user) {
      throw myError({
        status: 401,
        message: `Token authorization error. No user with id: ${id}`,
      });
    }
    req.body.user = user;
    console.log('\n');
    console.log('isAuth ID: ', id);
    console.log(token);
    next();
  } catch (error) {
    next(error);
  }
};
