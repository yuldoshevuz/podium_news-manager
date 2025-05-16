import { Request } from 'express';

export interface RequestWithDevice extends Request {
  headers: Request['headers'] & {
    'device-id'?: string;
  };
}
