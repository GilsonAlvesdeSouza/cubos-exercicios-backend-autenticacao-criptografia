import { Request, Response } from 'express';
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

    const body: Pokemon = validateBody([
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
    body.usuario_id = usuario_id;
    body.imagem = imagem?.toString().trim();
    body.apelido = apelido?.toString().trim();

    const newPokemon: Pokemon = await pokemonService.save(body);

    res.status(201).json(newPokemon);
  }

  async find(req: Request, res: Response) {
    const id = req.params.id;

    const body = validateBody([
      {
        param: id,
        field: 'id',
        type: 'number'
      }
    ]);

    const pokemon = await pokemonService.find(Number(body.id));

    if (!pokemon) {
      throw new NotFoundError('Pokemon não encontrado.');
    }

    res.json(pokemon);
  }

  async editName(req: Request, res: Response) {
    const id = req.params.id;
    const nome = req.body.nome;

    const body = validateBody([
      {
        param: id,
        field: 'id',
        type: 'number'
      },
      {
        param: nome,
        field: 'nome',
        type: 'string'
      }
    ]);

    const pokemon = await pokemonService.update(Number(body.id), body.nome);

    if (!pokemon) {
      throw new NotFoundError('Pokemon não encontrado.');
    }
    return res.json(pokemon);
  }

  async remove(req: Request, res: Response) {
    const id = req.params.id;

    const body = validateBody([
      {
        param: id,
        field: 'id',
        type: 'number'
      }
    ]);

    const pokemon = await pokemonService.delete(Number(body.id));

    if (!pokemon) {
      throw new NotFoundError('Pokemon não encontrado.');
    }

    res.status(200).json({ message: 'Removido com sucesso' });
  }
}
