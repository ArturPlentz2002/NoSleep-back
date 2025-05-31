import { Router } from 'express';
import { getRanking } from '../controllers/rankingController';

const router = Router();

/**
 * @route   GET /api/ranking
 * @desc    Retorna o ranking de participação
 * @access  Privado (autenticação necessária)
 */
router.get('/', getRanking);

export default router;
