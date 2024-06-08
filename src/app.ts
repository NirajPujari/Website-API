import cors, { CorsOptions } from 'cors';
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

const allowedOrigins = [
  'http://localhost:5173',
  'https://powerhousefitness.vercel.app',
];

const corsOptions: CorsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    // Allow requests with no origin (like mobile apps, curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

// Configuration for API
app.use(morgan('dev'));
app.use(helmet());
app.use(cors(corsOptions));
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
