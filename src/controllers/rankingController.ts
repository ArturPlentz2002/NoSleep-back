import { Request, Response } from 'express';
import { db } from '../firebaseAdmin';

/**
 * GET /api/ranking
 * Retorna o ranking de participação dos usuários,
 * ordenando por feedbackSent (desc) e em caso de empate por currentStreak (desc).
 */
export async function getRanking(req: Request, res: Response) {
  try {
    // 1. Referência à coleção "users"
    const usersRef = db.collection('users');

    // 2. Query: ordena por feedbackSent desc, depois por currentStreak desc
    const snapshot = await usersRef
      .orderBy('feedbackSent', 'desc')
      .orderBy('currentStreak', 'desc')
      .get();

    if (snapshot.empty) {
      // Nenhum usuário cadastrado → retorna lista vazia
      return res.status(200).json({ ranking: [] });
    }

    // 3. Mapeia cada documento para um objeto JS
    const rankingList: Array<{
      userId: string;
      name: string;
      email: string;
      feedbackSent: number;
      currentStreak: number;
    }> = [];

    snapshot.forEach((doc) => {
      const data = doc.data();
      rankingList.push({
        userId: doc.id,
        name: data.name || '—',
        email: data.email || '',
        feedbackSent: data.feedbackSent || 0,
        currentStreak: data.currentStreak || 0,
      });
    });

    // 4. Retorna JSON com o ranking completo
    return res.status(200).json({ ranking: rankingList });
  } catch (error) {
    console.error('Erro ao obter ranking:', error);
    return res
      .status(500)
      .json({ error: 'Erro interno ao obter ranking.' });
  }
}
