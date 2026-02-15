import { Request, Response, NextFunction } from 'express';
import { env } from '../config/environment';
import { createError } from './errorHandler';

export const authenticateAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const adminSecret = req.headers['x-admin-secret'] as string;

  if (!adminSecret || adminSecret !== env.adminSecret) {
    return next(createError(401, 'Unauthorized: Invalid admin credentials'));
  }

  next();
};
