import { BadRequestError } from '../errors';

type interfaceBody = {
  param: string;
  field: string;
  type: 'string' | 'number' | 'boolean';
};

export const validateBody = (args: interfaceBody[]) => {
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
      if (typeof Number(el.param) !== 'number') {
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
