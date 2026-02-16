import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';
import { createError } from './errorHandler';

export const wishSubmissionSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),
  type: z.enum(['text', 'video'], { required_error: 'Type must be either text or video' }),
  message: z.string().max(1000, 'Message is too long').optional().default(''),
}).refine((data: { type: string; message?: string }) => {
  // For text wishes, message is required and must be at least 10 characters
  if (data.type === 'text') {
    return data.message && data.message.length >= 10;
  }
  // For video wishes, message is optional
  return true;
}, {
  message: 'Text wishes must have a message of at least 10 characters',
  path: ['message'],
});

export const validate = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // DEBUG: Log what we're receiving
      console.log('[VALIDATION] req.body:', JSON.stringify(req.body, null, 2));
      console.log('[VALIDATION] req.file:', req.file ? 'present' : 'absent');
      
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        }));
        
        console.error('[VALIDATION ERROR] Details:', JSON.stringify(errorMessages, null, 2));
        
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
