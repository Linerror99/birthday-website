import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';
import { createError } from './errorHandler';

export const wishSubmissionSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),
  type: z.enum(['text', 'video'], { required_error: 'Type must be either text or video' }),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000, 'Message is too long'),
});

export const validate = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        }));
        
        return res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: errorMessages,
        });
      }
      next(error);
    }
  };
};

export const validateWishSubmission = validate(wishSubmissionSchema);
