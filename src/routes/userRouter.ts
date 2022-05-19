import { Router } from 'express';
import userController from '../controllers/user';
import { isAuth } from '../middlewares/isAuth';

const router = Router();

router.get('/', isAuth, userController.getAll);
router.get('/:id', isAuth, userController.getOne);
router.post('/add', isAuth, userController.add);
router.delete('/:id', isAuth, userController.deleteOne);

export default router;
