import { Router } from 'express';
import { isAuthenticated } from './middlewares/isAuthenticated';
import AutUserControllers from './controllers/user/AuthUserControllers';
import UserControllers from './controllers/user/UserControllers';

export const router = Router();
const userController = new UserControllers();
const authUserController = new AutUserControllers();

router.post('/users', userController.store);
router.post('/login', authUserController.auth);

router.use(isAuthenticated);
// router.post('/pokemons');
