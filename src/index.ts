import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import rankingRoutes from './routes/rankingRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Middlewares
app.use(cors());
app.use(express.json());

// 2. Rotas
app.use('/api/ranking', rankingRoutes);

// 3. Rota de teste (opcional)
app.get('/', (req: Request, res: Response) => {
  res.send('API NOSLEEP-BACK rodando.');
});

// 4. Handler de erro global (opcional)
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Erro inesperado:', err);
  res.status(500).json({ error: 'Erro interno do servidor.' });
});

// 5. Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
