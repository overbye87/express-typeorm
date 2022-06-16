import { Router } from 'express';
import authController from '../controllers/auth';
import { isAuth } from '../middlewares/isAuth';
import validator from '../middlewares/validator';
import validatorSchemas from '../validation/validatorSchemas';

const router = Router();

router.get('/', isAuth, authController.check);
router.post('/', validator(validatorSchemas.signIn), authController.signIn);
router.post('/signup', validator(validatorSchemas.signUp), authController.signUp);

export default router;
