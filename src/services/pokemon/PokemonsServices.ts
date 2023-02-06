import { getErrorMessage } from '../../helpers/getErrors';
import { Pokemon } from '../../models/PokemonModels';
import { dbConnect } from '../../pg_connection';

export default class PokemonsServices {
  async save({ usuario_id, nome, habilidade, imagem, apelido }: Pokemon) {
    const query = `insert into pokemons (usuario_id, nome, habilidades, imagem, apelido)
		values($1, $2, $3, $4, $5) returning nome, apelido, habilidades, imagem;`;
    const params = [usuario_id, nome, habilidade, imagem, apelido];

    try {
      const result = await dbConnect.query(query, params);

      const pokemon: Pokemon = result.rows[0];
      return pokemon;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }
}
