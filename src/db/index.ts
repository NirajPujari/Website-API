import { Db, MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

class Database {
  private static instance: Database;
  private db: Db | null = null;
  private client: MongoClient;

  private constructor() {
    const URL = process.env.MONGO_URL;
    if (!URL) {
      console.error('No URL found');
      process.exit(1);
    }
    this.client = new MongoClient(URL);
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public async connect(): Promise<void> {
    if (this.db) return;
    try {
      await this.client.connect();
      this.db = this.client.db('website-db');
      console.log('Connected to MongoDB');
    } catch (err) {
      console.error('Failed to connect to MongoDB', err);
      throw err;
    }
  }

  public getDb(): Db {
    if (!this.db) {
      throw new Error('Database not connected');
    }
    return this.db;
  }
}

export default Database;