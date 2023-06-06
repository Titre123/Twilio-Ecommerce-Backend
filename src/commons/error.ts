import { NextFunction, Request, Response } from 'express';

// Custom Error class
export class ApiError extends Error {
  constructor(message: string, public statusCode: number, public rawErrors?: string[] | unknown) {
    super(message);
    Error.captureStackTrace(this, this.constructor); // captures errors from every part of the application
  }
}

// Error handling middleware
export class ErrorHandler {
  static handle() {
    return (err: ApiError, req: Request, res: Response, next: NextFunction) => {
      const statusCode = err.statusCode || 500;
      let errorStack = {};
      // Include error stack trace in response only in development environment
      if (process.env.NODE_ENV == 'development') {
        errorStack = { stack: err.stack };
      }
      return res.status(statusCode).json({
        message: err.message,
        success: false,
        errorStack,
        rawErrors: err.rawErrors ?? [],
      });
    };
  }

  // Middleware to handle 404 Not Found errors
  static pagenotFound() {
    return (req: Request, res: Response, next: NextFunction) => {
      throw new NotFoundError(req.path);
    };
  }

  // Event listeners to handle unhandled rejections and uncaught exceptions
  static exceptionRejectionHandler() {
    process.on('unhandledRejection', (reason: Error, promise: Promise<any>) => {
      console.log(reason.name, reason.message);
      console.log('UNHANDLED REJECTION!.. Shutting down Server');
      throw reason;
    });

    process.on('uncaughtException', (err: Error) => {
      console.log(err.name, err.message);
      console.log('UNCAUGHT EXCEPTION!');
      process.exit(1);
    });
  }
}

// Custom Error classes that inherit from the ApiError class

// Error class for 404 Not Found errors
export class NotFoundError extends ApiError {
  constructor(path: string) {
    super(`Requested Path ${path} is not found`, 404);
  }
}

// Error class for authentication errors
export class AuthError extends ApiError {
  constructor(message: string) {
    super(message, 401);
  }
}

// Error class for authorization errors
export class NotAuthorizedError extends ApiError {
  constructor(){
    super("Not Authorized!", 403)
  }
}

// Error class for bad request errors
export class BadRequestError extends ApiError {
  constructor(public message: string, public errors?: string[]) {
    super(message, 400, errors);
  }
}

// Error class for internal server errors
export class InternalServerError extends ApiError{
  constructor(public errors?: unknown) {
    super("Internal Server Error", 500, errors);
  }
}

// Error class for conflict errors
export class ConflictError extends ApiError{
  constructor(){
    super("Email already Exist!", 409)
  }
}
