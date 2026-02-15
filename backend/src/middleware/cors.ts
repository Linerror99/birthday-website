import cors from 'cors';
import { env } from '../config/environment';

export const corsMiddleware = cors({
  origin: env.corsOrigin === '*' ? '*' : env.corsOrigin.split(','),
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Admin-Secret'],
  credentials: true,
});
