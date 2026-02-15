import { getFirestore } from '../config/firebase';
import { Wish, WishFilter, WishResponse } from '../types/wish.types';
import { logger } from '../utils/logger';

const WISHES_COLLECTION = 'wishes';

export class FirestoreService {
  private db = getFirestore();
  private wishesRef = this.db.collection(WISHES_COLLECTION);

  /**
   * Create a new wish
   */
  async createWish(wishData: Omit<Wish, 'id'>): Promise<string> {
    try {
      const docRef = await this.wishesRef.add({
        ...wishData,
        createdAt: new Date(),
      });
      logger.info(`Wish created with ID: ${docRef.id}`);
      return docRef.id;
    } catch (error) {
      logger.error('Error creating wish:', error);
      throw new Error('Failed to create wish');
    }
  }

  /**
   * Get wish by ID
   */
  async getWishById(wishId: string): Promise<Wish | null> {
    try {
      const doc = await this.wishesRef.doc(wishId).get();
      if (!doc.exists) {
        return null;
      }
      return {
        id: doc.id,
        ...(doc.data() as Omit<Wish, 'id'>),
      };
    } catch (error) {
      logger.error(`Error getting wish ${wishId}:`, error);
      throw new Error('Failed to get wish');
    }
  }

  /**
   * Get all wishes with optional filtering
   */
  async getAllWishes(filter?: WishFilter): Promise<Wish[]> {
    try {
      let query: FirebaseFirestore.Query = this.wishesRef.orderBy('createdAt', 'desc');

      if (filter?.approved !== undefined) {
        query = query.where('approved', '==', filter.approved);
      }
      if (filter?.rejected !== undefined) {
        query = query.where('rejected', '==', filter.rejected);
      }

      const snapshot = await query.get();
      const wishes: Wish[] = [];

      snapshot.forEach((doc) => {
        wishes.push({
          id: doc.id,
          ...(doc.data() as Omit<Wish, 'id'>),
        });
      });

      return wishes;
    } catch (error) {
      logger.error('Error getting all wishes:', error);
      throw new Error('Failed to get wishes');
    }
  }

  /**
   * Get approved wishes only
   */
  async getApprovedWishes(): Promise<Wish[]> {
    return this.getAllWishes({ approved: true, rejected: false });
  }

  /**
   * Update wish status
   */
  async updateWishStatus(
    wishId: string,
    status: { approved: boolean; rejected: boolean }
  ): Promise<void> {
    try {
      await this.wishesRef.doc(wishId).update(status);
      logger.info(`Wish ${wishId} status updated:`, status);
    } catch (error) {
      logger.error(`Error updating wish ${wishId}:`, error);
      throw new Error('Failed to update wish status');
    }
  }

  /**
   * Approve a wish
   */
  async approveWish(wishId: string): Promise<void> {
    return this.updateWishStatus(wishId, { approved: true, rejected: false });
  }

  /**
   * Reject a wish
   */
  async rejectWish(wishId: string): Promise<void> {
    return this.updateWishStatus(wishId, { approved: false, rejected: true });
  }

  /**
   * Restore a wish to pending (not approved, not rejected)
   */
  async restoreWish(wishId: string): Promise<void> {
    return this.updateWishStatus(wishId, { approved: false, rejected: false });
  }

  /**
   * Get total count of wishes
   */
  async getWishesCount(): Promise<number> {
    try {
      const snapshot = await this.wishesRef.count().get();
      return snapshot.data().count;
    } catch (error) {
      logger.error('Error counting wishes:', error);
      throw new Error('Failed to count wishes');
    }
  }

  /**
   * Delete a wish
   */
  async deleteWish(wishId: string): Promise<void> {
    try {
      await this.wishesRef.doc(wishId).delete();
      logger.info(`Wish ${wishId} deleted`);
    } catch (error) {
      logger.error(`Error deleting wish ${wishId}:`, error);
      throw new Error('Failed to delete wish');
    }
  }

  /**
   * Convert Wish to WishResponse (for API)
   */
  toWishResponse(wish: Wish): WishResponse {
    return {
      id: wish.id,
      name: wish.name,
      type: wish.type,
      message: wish.message,
      videoUrl: wish.videoUrl,
      approved: wish.approved,
      rejected: wish.rejected,
      createdAt: wish.createdAt.toISOString(),
    };
  }
}

export const firestoreService = new FirestoreService();
