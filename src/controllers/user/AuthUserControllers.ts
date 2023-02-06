import { Request, Response } from 'express';
import { validateBody } from '../../helpers/validateBody';
import { AuthUserServices } from '../../services/user/AuthUserServices';

export default class AutUserControllers {
  async auth(req: Request, res: Response) {
    const { email, password } = req.body;
    const authUserServices = new AuthUserServices();
    const authUser = validateBody([
      {
        param: email,
        field: 'email',
        type: 'string'
      },
      {
        param: password,
        field: 'password',
        type: 'string'
      }
    ]);

    const auth = await authUserServices.auth(authUser);
    return res.json(auth);
  }
}
