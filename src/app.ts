import express, { Express } from "express";
import 'express-async-errors';
import morgan from 'morgan';
import cors from 'cors';
import { ErrorHandler } from './commons/error';
import authRouter from "./modules/auth/auth.router";
import connectDB from "./utils/db/db_manager";

const app: Express = express();

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
const apiRouter = express.Router();
app.use('/api/v1', apiRouter);

apiRouter.use('/auth', authRouter);

app.use('*', ErrorHandler.pagenotFound());
app.use(ErrorHandler.handle());
ErrorHandler.exceptionRejectionHandler();

export default app;
