import { Router } from 'express';
import { isAuthenticated } from './middlewares/isAuthenticated';
import AutUserControllers from './controllers/user/AuthUserControllers';
import UserControllers from './controllers/user/UserControllers';
import PokemonControllers from './controllers/pokemon/PokemonControllers';

export const router = Router();
const userController = new UserControllers();
const authUserController = new AutUserControllers();
const pokemonController = new PokemonControllers();

router.post('/users', userController.store);
router.post('/login', authUserController.auth);

router.use(isAuthenticated);
router.get('/pokemons', pokemonController.index);
router.post('/pokemons', pokemonController.store);
router.get('/pokemons/:id', pokemonController.find);
