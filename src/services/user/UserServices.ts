import { BadRequestError } from '../../errors';
import { getErrorMessage } from '../../helpers/getErrors';
import { User } from '../../models/UserModels';
import { dbConnect } from '../../pg_connection';

export default class UserServices {
  async save({ nome, email, senha }: User) {
    const query = `insert into usuarios (nome, email, senha) values($1, $2, $3) returning *`;
    const params = [nome, email, senha];

    try {
      const result = await dbConnect.query(query, params);
      const user: User = result.rows[0];
      return user;
    } catch (error) {
      if (
        getErrorMessage(error) ===
        'duplicate key value violates unique constraint "usuarios_email_key"'
      ) {
        throw new BadRequestError('O email informado já existe');
      }
      throw new Error(getErrorMessage(error));
    }
  }
}
