import { Router } from 'express';
import { feedbackController } from '../controllers/feedbackController';
import { authMiddleware } from '../middleware/authMidleware';

const router = Router();

router.use(authMiddleware);

router.post('/send', feedbackController.send);
router.get('/inbox', feedbackController.getInbox);
router.get('/sent', feedbackController.getSent);

export default router;
