import { InsertOneResult, WithId, Document, UpdateResult, DeleteResult } from 'mongodb';

export type CardsGetRequest = {}
export type CardsGetResponse = WithId<Document>[] | string;

export type CardsPostRequest = {
  title: string,
  image: string,
  description: string,
}
export type CardsPostResponse = InsertOneResult<Document> | string;

export type CardsPutRequest = {
  _id: string,
  title?: string,
  image?: string,
  description?: string,
}
export type CardsPutResponse = UpdateResult<Document> | string;

export type CardsDeleteRequest = { _id: string }
export type CardsDeleteResponse = DeleteResult | string;