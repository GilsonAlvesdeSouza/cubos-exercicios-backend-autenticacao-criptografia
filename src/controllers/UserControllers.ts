import { Request, Response } from 'express';
import { hash } from 'bcryptjs';
import { validateBody } from '../helpers/validateBody';
import { User } from '../models/userModels';
import UserServices from '../services/UserServices';

const userService = new UserServices();

export default class UserControllers {
  async store(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const user: User = validateBody([
      {
        param: name,
        field: 'nome',
        type: 'string'
      },
      {
        param: email,
        field: 'email',
        type: 'string'
      },
      {
        param: password,
        field: 'senha',
        type: 'string'
      }
    ]);

    const passwordHash = await hash(user.senha, 10);

    user.senha = passwordHash;

    const newUser: User = <User>await userService.save(user);

    res.json(newUser);
  }
}
