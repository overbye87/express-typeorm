import { Router } from 'express';
import authController from '../controllers/auth';
import validator from '../middlewares/validator';
import validatorSchemas from '../validation/validatorSchemas';

const router = Router();

router.get('/', authController.check);
router.post('/', validator(validatorSchemas.signIn), authController.signIn);
router.post('/signup', authController.signUp);

export default router;
