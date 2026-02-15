import multer from 'multer';
import { env } from '../config/environment';
import { createError } from './errorHandler';

// Store files in memory
const storage = multer.memoryStorage();

// File filter for video uploads
const videoFileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (env.allowedVideoFormats.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      createError(
        400,
        `Invalid file type. Allowed formats: ${env.allowedVideoFormats.join(', ')}`
      )
    );
  }
};

export const videoUpload = multer({
  storage,
  fileFilter: videoFileFilter,
  limits: {
    fileSize: env.maxVideoSizeMB * 1024 * 1024, // Convert MB to bytes
  },
});
