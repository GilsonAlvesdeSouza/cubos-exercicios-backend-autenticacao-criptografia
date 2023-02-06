import { BadRequestError } from '../errors';

type BodyType = {
  param: string;
  field: string;
  type: string;
};

export const validateBody = (args: BodyType[]) => {
  let validateObject: any = {};
  for (const el of args) {
    if (!el.param || el.param === '') {
      throw new BadRequestError(`O campo ${el.field} é obrigatório.`);
    }
    if (el.type === 'string') {
      if (typeof el.param !== 'string') {
        throw new BadRequestError(
          `O campo ${el.field} precisa ser do tipo texto`
        );
      }
    }
    if (el.type === 'number') {
      if (typeof el.param !== 'number') {
        throw new BadRequestError(
          `O campo ${el.field} precisa ser do tipo numérico`
        );
      }
    }
    if (el.type === 'boolean') {
      if (typeof el.param !== 'boolean') {
        throw new BadRequestError(
          `O campo ${el.field} precisa ser do tipo booleano`
        );
      }
    }
    validateObject[el.field] = el.param.trim();
  }

  return validateObject;
};
