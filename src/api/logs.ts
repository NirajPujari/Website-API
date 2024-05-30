import express from 'express';
import { LogGetRequest, LogGetResponse, LogPostRequest, LogPostResponse } from './types';

const router = express.Router();

// Middleware to check database connection
router.use((req, res, next) => {
  if (!req.db) {
    return res.status(500).json({ error: 'Database not connected' });
  }
  next();
});
// GET route to fetch logs
router.get<LogGetRequest, LogGetResponse>('/', async (req, res) => {
  try {
    const collection = req.db.collection('logs');
    const result = await collection.find({}).toArray();
    res.json(result);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json('Internal Server Error');
  }
});

// POST route to insert a log
router.post<LogPostRequest, LogPostResponse>('/', async (req, res) => {
  try {
    const { ip, date, route } = req.body;

    // Validate request body
    if (!ip || !date || !route) {
      return res.status(400).json('Bad Request: Missing required fields');
    }

    const collection = req.db.collection('logs');
    const result = await collection.insertOne({ ip, date: new Date(date), route });
    res.json(result);
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json('Internal Server Error');
  }
});

export default router;
