import { Router } from 'express';
import userRouter from './userRouter';
import authRouter from './authRouter';
import { isAuth } from '../middlewares/isAuth';

const router = Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);

export default router;
