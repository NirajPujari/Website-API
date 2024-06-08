import { InsertOneResult, WithId, Document } from 'mongodb';

export type LogGetResponse = WithId<Document>[] | string;

export type LogGetRequest = {}

export type LogPostRequest = {
  ip: string;
  date: string; // Date in ISO format as string for JSON
  route: string;
}

export type LogPostResponse = InsertOneResult<Document> | string;