import { Request, Response } from 'express';
import { validateBody } from '../../helpers/validateBody';
import { Pokemon } from '../../models/PokemonModels';
import PokemonsServices from '../../services/pokemon/PokemonsServices';

const pokemonService = new PokemonsServices();

export default class PokemonControllers {
  async store(req: Request, res: Response) {
    const { nome, habilidade, imagem, apelido }: Pokemon = req.body;
    const usuario_id = Number(req.user_id);

    const pokemon: Pokemon = validateBody([
      {
        param: nome,
        field: 'nome',
        type: 'string'
      },
      {
        param: habilidade,
        field: 'habilidade',
        type: 'string'
      }
    ]);
    pokemon.usuario_id = usuario_id;
    pokemon.imagem = imagem?.toString().trim();
    pokemon.apelido = apelido?.toString().trim();

    const newPokemon: Pokemon = await pokemonService.save(pokemon);

    res.status(201).json(newPokemon);
  }
}
