import { Router } from 'express';
import userController from '../controllers/userController';

const router = Router();

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getOneUser);
router.post('/add', userController.addUser);
router.delete('/:id', userController.deleteUser);

export default router;
