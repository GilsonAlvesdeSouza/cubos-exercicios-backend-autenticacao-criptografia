import { Router } from 'express';
import UserControllers from './controllers/UserControllers';

export const router = Router();
const userController = new UserControllers();

router.post('/users', userController.store);
