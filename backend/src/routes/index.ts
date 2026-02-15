import { Router } from 'express';
import healthRoutes from './health.routes';
import wishesRoutes from './wishes.routes';

const router = Router();

router.use('/health', healthRoutes);
router.use('/wishes', wishesRoutes);

export default router;
