import express from 'express';
import logs from './logs';
import temp from './temp';
import cards from './cards'
import { MessageResponse } from '../interfaces';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API routes /temp, /logs',
  });
});

router.use((req, res, next) => {
  if (!req.db) {
    return res.status(500).json({ error: 'Database not connected' });
  }
  next();
});

router.use('/temp', temp);
router.use('/logs', logs);
router.use('/cards', cards);

export default router;
