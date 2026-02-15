import { Request, Response, NextFunction } from 'express';
import { firestoreService } from '../services/firestore.service';
import { storageService } from '../services/storage.service';
import { CreateWishDto, SubmitWishResponse } from '../types/wish.types';
import { createError } from '../middleware/errorHandler';
import { logger } from '../utils/logger';

export class WishesController {
  /**
   * Submit a new wish (text or video)
   */
  async submitWish(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, type, message } = req.body;
      const videoFile = req.file;

      // Validate video upload for video type
      if (type === 'video' && !videoFile) {
        return next(createError(400, 'Video file is required for video wishes'));
      }

      if (type === 'text' && videoFile) {
        return next(createError(400, 'Video file should not be provided for text wishes'));
      }

      let videoStoragePath: string | undefined;
      let videoUrl: string | undefined;

      // Upload video if provided
      if (videoFile && type === 'video') {
        const uploadResult = await storageService.uploadVideo(videoFile);
        videoStoragePath = uploadResult.path;
        videoUrl = uploadResult.url;
      }

      // Create wish in Firestore
      const wishId = await firestoreService.createWish({
        name,
        type,
        message,
        videoStoragePath,
        videoUrl,
        approved: false,
        rejected: false,
        createdAt: new Date(),
      });

      const response: SubmitWishResponse = {
        success: true,
        message: 'Wish submitted successfully and pending approval',
        wishId,
      };

      logger.info(`Wish submitted successfully: ${wishId}`);
      res.status(201).json(response);
    } catch (error) {
      logger.error('Error submitting wish:', error);
      next(createError(500, 'Failed to submit wish'));
    }
  }

  /**
   * Get all wishes (admin only)
   */
  async getAllWishes(req: Request, res: Response, next: NextFunction) {
    try {
      const { approved, rejected } = req.query;

      const filter: any = {};
      if (approved !== undefined) {
        filter.approved = approved === 'true';
      }
      if (rejected !== undefined) {
        filter.rejected = rejected === 'true';
      }

      const wishes = await firestoreService.getAllWishes(filter);
      
      // Regenerate signed URLs for videos if needed
      const wishesWithUrls = await Promise.all(
        wishes.map(async (wish) => {
          if (wish.type === 'video' && wish.videoStoragePath) {
            const signedUrl = await storageService.getSignedUrl(wish.videoStoragePath);
            return { ...wish, videoUrl: signedUrl };
          }
          return wish;
        })
      );

      const response = wishesWithUrls.map((wish) => firestoreService.toWishResponse(wish));

      res.json({
        success: true,
        count: response.length,
        wishes: response,
      });
    } catch (error) {
      logger.error('Error getting all wishes:', error);
      next(createError(500, 'Failed to fetch wishes'));
    }
  }

  /**
   * Get approved wishes (public access)
   */
  async getApprovedWishes(req: Request, res: Response, next: NextFunction) {
    try {
      const wishes = await firestoreService.getApprovedWishes();
      
      // Regenerate signed URLs for videos
      const wishesWithUrls = await Promise.all(
        wishes.map(async (wish) => {
          if (wish.type === 'video' && wish.videoStoragePath) {
            const signedUrl = await storageService.getSignedUrl(wish.videoStoragePath);
            return { ...wish, videoUrl: signedUrl };
          }
          return wish;
        })
      );

      const response = wishesWithUrls.map((wish) => firestoreService.toWishResponse(wish));

      res.json({
        success: true,
        count: response.length,
        wishes: response,
      });
    } catch (error) {
      logger.error('Error getting approved wishes:', error);
      next(createError(500, 'Failed to fetch approved wishes'));
    }
  }

  /**
   * Get wish by ID
   */
  async getWishById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const wish = await firestoreService.getWishById(id);

      if (!wish) {
        return next(createError(404, 'Wish not found'));
      }

      // Regenerate signed URL for video if needed
      if (wish.type === 'video' && wish.videoStoragePath) {
        const signedUrl = await storageService.getSignedUrl(wish.videoStoragePath);
        wish.videoUrl = signedUrl;
      }

      res.json({
        success: true,
        wish: firestoreService.toWishResponse(wish),
      });
    } catch (error) {
      logger.error('Error getting wish:', error);
      next(createError(500, 'Failed to fetch wish'));
    }
  }

  /**
   * Approve a wish (admin only)
   */
  async approveWish(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      
      const wish = await firestoreService.getWishById(id);
      if (!wish) {
        return next(createError(404, 'Wish not found'));
      }

      await firestoreService.approveWish(id);

      res.json({
        success: true,
        message: 'Wish approved successfully',
      });
    } catch (error) {
      logger.error('Error approving wish:', error);
      next(createError(500, 'Failed to approve wish'));
    }
  }

  /**
   * Reject a wish (admin only)
   */
  async rejectWish(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      
      const wish = await firestoreService.getWishById(id);
      if (!wish) {
        return next(createError(404, 'Wish not found'));
      }

      await firestoreService.rejectWish(id);

      res.json({
        success: true,
        message: 'Wish rejected successfully',
      });
    } catch (error) {
      logger.error('Error rejecting wish:', error);
      next(createError(500, 'Failed to reject wish'));
    }
  }

  /**
   * Restore a wish to pending (admin only)
   */
  async restoreWish(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      
      const wish = await firestoreService.getWishById(id);
      if (!wish) {
        return next(createError(404, 'Wish not found'));
      }

      await firestoreService.restoreWish(id);

      res.json({
        success: true,
        message: 'Wish restored to pending successfully',
      });
    } catch (error) {
      logger.error('Error restoring wish:', error);
      next(createError(500, 'Failed to restore wish'));
    }
  }

  /**
   * Delete a wish (admin only)
   */
  async deleteWish(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      
      const wish = await firestoreService.getWishById(id);
      if (!wish) {
        return next(createError(404, 'Wish not found'));
      }

      // Delete video from storage if exists
      if (wish.videoStoragePath) {
        await storageService.deleteVideo(wish.videoStoragePath);
      }

      // Delete from Firestore
      await firestoreService.deleteWish(id);

      res.json({
        success: true,
        message: 'Wish deleted successfully',
      });
    } catch (error) {
      logger.error('Error deleting wish:', error);
      next(createError(500, 'Failed to delete wish'));
    }
  }
}

export const wishesController = new WishesController();
