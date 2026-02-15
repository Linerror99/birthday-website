import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

interface Environment {
  port: number;
  nodeEnv: string;
  gcpProjectId: string;
  firebaseDatabaseId: string;
  googleApplicationCredentials: string;
  storageBucketVideos: string;
  storageBucketAssets: string;
  signedUrlExpirationHours: number;
  adminSecret: string;
  pinCode: string;
  corsOrigin: string;
  rateLimitWindowMs: number;
  rateLimitMaxRequests: number;
  maxVideoSizeMB: number;
  allowedVideoFormats: string[];
}

function getEnv(key: string, defaultValue?: string): string {
  const value = process.env[key] || defaultValue;
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

export const env: Environment = {
  port: parseInt(getEnv('PORT', '3000'), 10),
  nodeEnv: getEnv('NODE_ENV', 'development'),
  gcpProjectId: getEnv('GCP_PROJECT_ID'),
  firebaseDatabaseId: getEnv('FIREBASE_DATABASE_ID', 'vesper-db'),
  googleApplicationCredentials: getEnv('GOOGLE_APPLICATION_CREDENTIALS'),
  storageBucketVideos: getEnv('STORAGE_BUCKET_VIDEOS'),
  storageBucketAssets: getEnv('STORAGE_BUCKET_ASSETS'),
  signedUrlExpirationHours: parseInt(getEnv('SIGNED_URL_EXPIRATION_HOURS', '24'), 10),
  adminSecret: getEnv('ADMIN_SECRET'),
  pinCode: getEnv('PIN_CODE'),
  corsOrigin: getEnv('CORS_ORIGIN', '*'),
  rateLimitWindowMs: parseInt(getEnv('RATE_LIMIT_WINDOW_MS', '60000'), 10),
  rateLimitMaxRequests: parseInt(getEnv('RATE_LIMIT_MAX_REQUESTS', '10'), 10),
  maxVideoSizeMB: parseInt(getEnv('MAX_VIDEO_SIZE_MB', '100'), 10),
  allowedVideoFormats: getEnv('ALLOWED_VIDEO_FORMATS', 'video/mp4,video/webm,video/quicktime').split(','),
};

export const isDevelopment = env.nodeEnv === 'development';
export const isProduction = env.nodeEnv === 'production';
