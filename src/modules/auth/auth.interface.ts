import { Request } from 'express';

export interface AuthRequest extends Request {
  user?: any;
}

export interface User {
  firstName: string,
  lastName: string,
  email: string;
  phoneNumber: string;
  password: string;
  [key: string]: any;
}

export interface userPayload{
  id: string,
  email: string,
  role: string
}

export interface userSignInPayload {
  email: string,
  password: string
}