import { Request, Response } from 'express';
import { env } from '../config/environment';

export const healthCheck = (req: Request, res: Response) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: env.nodeEnv,
    uptime: process.uptime(),
    message: 'Vesper Birthday API is running',
  });
};
