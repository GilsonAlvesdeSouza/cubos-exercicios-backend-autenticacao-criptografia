import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { UnauthorizedError } from '../errors';

interface Payload {
  sub: string;
}

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    throw new UnauthorizedError('Não autorizado.');
  }

  const [, token] = authToken.split(' ');

  try {
    const { sub } = verify(token, process.env.JWT_SECRET as string) as Payload;
    req.user_id = sub;
    next();
  } catch (error) {
		throw new UnauthorizedError('Não autorizado.');
	}
}
