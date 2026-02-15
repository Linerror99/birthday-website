import { getStorage } from '../config/firebase';
import { env } from '../config/environment';
import { logger } from '../utils/logger';
import { v4 as uuidv4 } from 'uuid';

export class StorageService {
  private storage = getStorage();
  private videosBucket = this.storage.bucket(env.storageBucketVideos);

  /**
   * Upload video file to Cloud Storage
   */
  async uploadVideo(file: Express.Multer.File): Promise<{ path: string; url: string }> {
    try {
      // Generate unique filename
      const timestamp = Date.now();
      const randomId = uuidv4();
      const extension = file.originalname.split('.').pop() || 'mp4';
      const filename = `videos/${timestamp}-${randomId}.${extension}`;

      // Upload file
      const blob = this.videosBucket.file(filename);
      const blobStream = blob.createWriteStream({
        resumable: false,
        metadata: {
          contentType: file.mimetype,
          metadata: {
            originalName: file.originalname,
            uploadedAt: new Date().toISOString(),
          },
        },
      });

      return new Promise((resolve, reject) => {
        blobStream.on('error', (error) => {
          logger.error('Error uploading video:', error);
          reject(new Error('Failed to upload video'));
        });

        blobStream.on('finish', async () => {
          try {
            // Generate signed URL
            const signedUrl = await this.getSignedUrl(filename);
            logger.info(`Video uploaded successfully: ${filename}`);
            resolve({
              path: filename,
              url: signedUrl,
            });
          } catch (error) {
            logger.error('Error generating signed URL:', error);
            reject(error);
          }
        });

        blobStream.end(file.buffer);
      });
    } catch (error) {
      logger.error('Error in uploadVideo:', error);
      throw new Error('Failed to upload video');
    }
  }

  /**
   * Generate signed URL for video access
   */
  async getSignedUrl(filePath: string): Promise<string> {
    try {
      const file = this.videosBucket.file(filePath);
      
      const [url] = await file.getSignedUrl({
        version: 'v4',
        action: 'read',
        expires: Date.now() + env.signedUrlExpirationHours * 60 * 60 * 1000,
      });

      return url;
    } catch (error) {
      logger.error(`Error generating signed URL for ${filePath}:`, error);
      throw new Error('Failed to generate signed URL');
    }
  }

  /**
   * Delete video from Cloud Storage
   */
  async deleteVideo(filePath: string): Promise<void> {
    try {
      await this.videosBucket.file(filePath).delete();
      logger.info(`Video deleted: ${filePath}`);
    } catch (error) {
      logger.error(`Error deleting video ${filePath}:`, error);
      throw new Error('Failed to delete video');
    }
  }

  /**
   * Check if file exists
   */
  async fileExists(filePath: string): Promise<boolean> {
    try {
      const [exists] = await this.videosBucket.file(filePath).exists();
      return exists;
    } catch (error) {
      logger.error(`Error checking file existence ${filePath}:`, error);
      return false;
    }
  }

  /**
   * Get file metadata
   */
  async getFileMetadata(filePath: string) {
    try {
      const [metadata] = await this.videosBucket.file(filePath).getMetadata();
      return metadata;
    } catch (error) {
      logger.error(`Error getting file metadata ${filePath}:`, error);
      throw new Error('Failed to get file metadata');
    }
  }
}

export const storageService = new StorageService();
