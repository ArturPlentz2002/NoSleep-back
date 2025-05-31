import { Router } from 'express';
import { feedbackController } from '../controllers/feedbackController';
import { authMiddleware } from '../middleware/authMidleware';


const router = Router();

// Apply auth middleware to all feedback routes
router.use(authMiddleware);

// Define feedback routes
router.post('/send', feedbackController.send);
router.get('/inbox', feedbackController.getInbox);
router.get('/sent', feedbackController.getSent);

export default router;

