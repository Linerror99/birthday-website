import { Router } from 'express';
import { wishesController } from '../controllers/wishes.controller';
import { authenticateAdmin } from '../middleware/auth';
import { validateWishSubmission } from '../middleware/validation';
import { videoUpload } from '../middleware/upload';
import { submitWishRateLimiter } from '../middleware/rateLimit';

const router = Router();

// Public routes
router.post(
  '/submit',
  submitWishRateLimiter,
  videoUpload.single('video'),
  validateWishSubmission,
  wishesController.submitWish.bind(wishesController)
);

router.get(
  '/approved',
  wishesController.getApprovedWishes.bind(wishesController)
);

// Admin routes
router.get(
  '/',
  authenticateAdmin,
  wishesController.getAllWishes.bind(wishesController)
);

router.get(
  '/:id',
  authenticateAdmin,
  wishesController.getWishById.bind(wishesController)
);

router.patch(
  '/:id/approve',
  authenticateAdmin,
  wishesController.approveWish.bind(wishesController)
);

router.patch(
  '/:id/reject',
  authenticateAdmin,
  wishesController.rejectWish.bind(wishesController)
);

router.patch(
  '/:id/restore',
  authenticateAdmin,
  wishesController.restoreWish.bind(wishesController)
);

router.delete(
  '/:id',
  authenticateAdmin,
  wishesController.deleteWish.bind(wishesController)
);

export default router;
