import dotenv from 'dotenv';
import app from './app';
import logger from "./utils/logging/logger";
import { Application } from 'express';

dotenv.config();

class Server {
  private app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  start() {
      this.app.listen(process.env.APP_PORT, () => {
        logger.info(`Listening on url http://localhost:${process.env.APP_PORT}`);
      });
  }
}

const server =  new Server(app);
server.start()