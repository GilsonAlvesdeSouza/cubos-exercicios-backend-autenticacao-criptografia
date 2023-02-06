import { getErrorMessage } from '../../helpers/getErrors';
import { Pokemon } from '../../models/PokemonModels';
import { dbConnect } from '../../pg_connection';

export default class PokemonsServices {
  async all() {
    const query = `select p.*, u.nome as nome_usuario from pokemons p 
    join usuarios u on u.id = p.usuario_id ;`;
    const result = await dbConnect.query(query);
    const resultList = result.rows;
    type pokemonType = {
      id: number;
      usuario: string;
      nome: string;
      apelido: string;
      habilidades: string[];
      imagem: string;
    };

    const pokemonList: pokemonType[] = [];
    for (const el of resultList) {
      let habilidades: string[] = [];
      if (el.habilidades) {
        habilidades = el.habilidades.split(',');
      }

      pokemonList.push({
        id: Number(el.id),
        usuario: el.nome_usuario,
        nome: el.nome,
        apelido: el.apelido,
        habilidades,
        imagem: el.imagem
      });
    }

    return pokemonList;
  }

  async find(id: number) {
    const query = `select * from pokemons where id = $1`;

    const result = await dbConnect.query(query, [id]);

    if (result.rows[0] < 1) {
      return undefined;
    }
    const pokemon: Pokemon = result.rows[0];

    return pokemon;
  }

  async save({ usuario_id, nome, habilidades, imagem, apelido }: Pokemon) {
    const query = `insert into pokemons (usuario_id, nome, habilidades, imagem, apelido)
		values($1, $2, $3, $4, $5) returning nome, apelido, habilidades, imagem;`;
    const params = [usuario_id, nome, habilidades, imagem, apelido];

    try {
      const result = await dbConnect.query(query, params);

      const pokemon: Pokemon = result.rows[0];
      return pokemon;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }

  async update(id: number, name: string) {
    const pokemon = await this.find(id);
    if (pokemon) {
      console.log(pokemon?.id);
      const query = `update pokemons set nome = $1
      where id = $2 returning *`;
      const params = [name, id];
      const result = await dbConnect.query(query, params);
      return result.rows[0];
    }
  }
}
