import rateLimit from 'express-rate-limit';
import { env } from '../config/environment';

export const generalRateLimiter = rateLimit({
  windowMs: env.rateLimitWindowMs,
  max: env.rateLimitMaxRequests,
  message: {
    success: false,
    error: 'Too many requests, please try again later',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const submitWishRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // Max 3 wishes per 15 minutes per IP
  message: {
    success: false,
    error: 'You can only submit 3 wishes per 15 minutes. Please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
