import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import express from 'express';
import compression from 'compression';
import cookiesParser from 'cookie-parser';

import api from './api';
import Database from './db';
import * as middleware from './middleware';
import { MessageRequest, MessageResponse } from './interfaces';

const app = express();

// Middleware to attach the database instance to the request
app.use((req, res, next) => {
  const database = Database.getInstance();
  req.db = database.getDb();
  next();
});

// Configuration for API
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(cookiesParser());
app.use(express.json());

// Base route
app.get<MessageRequest, MessageResponse>('/', (req, res) => {
  res.json({ message: 'Got a Fetch request' });
});

// API routes
app.use('/api', api);

// Middleware for error handling
app.use(middleware.notFound);
app.use(middleware.errorHandler);

export default app;
