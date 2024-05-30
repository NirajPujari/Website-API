import express from 'express';
import { TempRequest, TempResponse } from './types';

const router = express.Router();

router.get<TempRequest, TempResponse>('/', (req, res) => {
  res.json({ message: 'The Given request is fro temp' });
});

export default router;