import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../errors';

export const erros = (
  error: Error & Partial<ApiError>,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = error.statusCode ?? 500;
  const message = error.statusCode ? error.message : 'Internal server error.';
  if (error) {
    console.log(error);
  }
  return res.status(statusCode).json({ message });
};
