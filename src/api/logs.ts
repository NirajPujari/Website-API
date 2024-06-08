import express from 'express';
import { LogGetRequest, LogGetResponse, LogPostRequest, LogPostResponse } from './types';

const router = express.Router();

// GET route to fetch Logs
router.get<LogGetRequest, LogGetResponse>('/', async (req, res) => {
  try {
    const collection = req.db.collection('Logs');
    const result = await collection.find({}).toArray();
    res.json(result);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json('Internal Server Error');
  }
});

// POST route to insert a Log
router.post<LogPostRequest, LogPostResponse>('/', async (req, res) => {
  try {
    const { ip, date, route } = req.body;

    // Validate request body
    if (!ip || !date || !route) {
      return res.status(400).json('Bad Request: Missing required fields');
    }

    const collection = req.db.collection('Logs');
    const result = await collection.insertOne({ ip, date: new Date(date), route });
    res.json(result);
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json('Internal Server Error');
  }
});

export default router;
