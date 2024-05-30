import express from 'express';
import logs from './logs';
import temp from './temp';
import { MessageResponse } from '../interfaces';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API routes /temp, /logs',
  });
});

router.use('/temp', temp);
router.use('/logs', logs);

export default router;
