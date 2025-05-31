import { Router } from 'express';
import { statsController } from '../controllers/statsControllers';
import { authMiddleware } from '../middleware/authMidleware';

const router = Router();

// Apply auth middleware to this route
router.use(authMiddleware);

// Define the stats route
router.get('/stats', statsController.getUserStats);

export default router;

