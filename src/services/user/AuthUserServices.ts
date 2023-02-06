import { compare } from 'bcryptjs';
import 'dotenv/config';
import { sign } from 'jsonwebtoken';
import { BadRequestError } from '../../errors';
import { User } from '../../models/UserModels';
import { dbConnect } from '../../pg_connection';

interface AuthRequest {
  email: string;
  password: string;
}

export class AuthUserServices {
  async auth({ email, password }: AuthRequest) {
    const query = `select * from usuarios  where email  = $1;`;
    const result = await dbConnect.query(query, [email]);

    const user: User = result.rows[0];

    if (!user) {
      throw new BadRequestError('Usuario/senha inválidos.');
    }

    const passwordMatch = await compare(password, user.senha);

    if (!passwordMatch) {
      throw new BadRequestError('Usuario/senha inválidos.');
    }

    const token = sign({ id: user.id }, process.env.JWT_SECRET as string, {
      subject: String(user.id),
      expiresIn: '1d'
    });

    return { id: user.id, nome: user.nome, email: user.email, token };
  }
}
