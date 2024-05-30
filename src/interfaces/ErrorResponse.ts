import { MessageResponse } from './Message';

export interface ErrorResponse extends MessageResponse {
  stack?: string;
}