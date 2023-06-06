import sha1 from 'sha1';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { AuthError, InternalServerError } from '../../commons/error';
import { userPayload } from '../../modules/auth/auth.interface';

dotenv.config();

// Retrieve the JWT secret from environment variables
const secret: string | undefined = process.env.JWT_SECRET;

// Throw an error if the JWT secret is not defined
if (!secret) {
  throw new InternalServerError("JWT SECRET HAS NO VALUE!");
}

// Compare the provided password with its SHA1 hash
const comparePassword = (password: string) => {
  return sha1(password) === password;
};

// Create a JWT token with the user payload
const createJWT = (user: userPayload) => {
  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, secret, {
    expiresIn: process.env.JWT_EXPIRE,
  });
  return token;
};

// Create a short-lived JWT token with the user payload
const createShortJWT = (user: userPayload) => {
  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, secret, {
    expiresIn: '10m',
  });
  return token;
};

// Verify and decode a JWT token, returning the user payload
const verifyJWT = (token: string): userPayload => {
  try {
    const payload = jwt.verify(token, secret);
    return payload as userPayload;
  } catch (e) {
    throw new AuthError('Invalid Token Provided');
  }
};

export { createJWT, comparePassword, verifyJWT, createShortJWT };
