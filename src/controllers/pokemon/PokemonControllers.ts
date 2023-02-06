import { json, Request, Response } from 'express';
import { NotFoundError } from '../../errors';
import { validateBody } from '../../helpers/validateBody';
import { Pokemon } from '../../models/PokemonModels';
import PokemonsServices from '../../services/pokemon/PokemonsServices';

const pokemonService = new PokemonsServices();

export default class PokemonControllers {
  async index(req: Request, res: Response) {
    const pokemons = await pokemonService.all();
    if (pokemons.length < 1) {
      return res.status(204).json();
    }
    res.json(pokemons);
  }

  async store(req: Request, res: Response) {
    const { nome, habilidades, imagem, apelido }: Pokemon = req.body;
    const usuario_id = Number(req.user_id);

    const pokemon: Pokemon = validateBody([
      {
        param: nome,
        field: 'nome',
        type: 'string'
      },
      {
        param: habilidades,
        field: 'habilidades',
        type: 'string'
      }
    ]);
    pokemon.usuario_id = usuario_id;
    pokemon.imagem = imagem?.toString().trim();
    pokemon.apelido = apelido?.toString().trim();

    const newPokemon: Pokemon = await pokemonService.save(pokemon);

    res.status(201).json(newPokemon);
  }

  async find(req: Request, res: Response) {
    const id = req.params.id;

    const idPokemon = validateBody([
      {
        param: id,
        field: 'id',
        type: 'number'
      }
    ]);

    const pokemon = await pokemonService.find(Number(idPokemon.id));

    if (!pokemon) {
      throw new NotFoundError('Pokemon não encontrado.');
    }

    res.json(pokemon);
  }
}
