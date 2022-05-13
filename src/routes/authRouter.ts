import { Router } from 'express';
import authController from '../controllers/auth';

const router = Router();

router.get('/', authController.check);
router.post('/', authController.signIn);
router.post('/signup', authController.signUp);

export default router;
