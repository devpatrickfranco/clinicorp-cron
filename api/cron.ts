import type { VercelRequest, VercelResponse } from '@vercel/node';
import { start } from '../src/index';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    await start();
    res.status(200).json({ message: 'Cron executado com sucesso' });
  } catch (error) {
    console.error('Erro ao executar cron:', error);
    res.status(500).json({ error: 'Erro ao executar cron' });
  }
}
