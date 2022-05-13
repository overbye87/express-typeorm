import { Router } from 'express';
import userController from '../controllers/user';

const router = Router();

router.get('/', userController.getAll);
router.get('/:id', userController.getOne);
router.post('/add', userController.add);
router.delete('/:id', userController.deleteOne);

export default router;
