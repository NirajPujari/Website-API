import express from 'express';
import { ObjectId } from 'mongodb';

const router = express.Router();

// GET route to fetch Cards
router.get('/', async (req, res) => {
  try {
    const collection = req.db.collection('Cards');
    const result = await collection.find({}).toArray();
    res.json(result);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json('Internal Server Error');
  }
});

// POST route to insert a Cards
router.post('/', async (req, res) => {
  try {
    const { title, image, description } = req.body;

    // Validate request body
    if (!title || !image || !description) {
      return res.status(400).json('Bad Request: Missing required fields');
    }

    const collection = req.db.collection('Cards');
    const result = await collection.insertOne({ title, image, description });
    res.json(result);
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json('Internal Server Error');
  }
});

type props = { title?: string; image?: string; description?: string }

// PUT route to update a Card
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, image, description } = req.body;

    // Validate the ID parameter
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Bad Request: Invalid ID format' });
    }

    // Validate request body - at least one field must be present for update
    if (!title && !image && !description) {
      return res.status(400).json({ error: 'Bad Request: Missing fields to update' });
    }

    const updateFields: props = {};
    if (title) updateFields.title = title;
    if (image) updateFields.image = image;
    if (description) updateFields.description = description;

    const collection = req.db.collection('Cards');
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateFields }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Not Found: No card with that ID' });
    }

    res.json({ message: 'Card updated successfully', result });
  } catch (error) {
    console.error('Error updating data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE route to delete a Card
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Validate request body
    if (id) {
      return res.status(400).json('Bad Request: Missing required field _id');
    }

    const collection = req.db.collection('Cards');
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json('Not Found: No card with that ID');
    }

    res.json(result);
  } catch (error) {
    console.error('Error deleting data:', error);
    res.status(500).json('Internal Server Error');
  }
});

export default router;
