import { Router } from 'express';
import authController from '../controllers/authController';

const router = Router();

router.get('/', authController.check);
router.post('/', authController.authentication);
router.post('/reg', authController.registration);

export default router;
