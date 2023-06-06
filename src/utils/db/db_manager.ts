import { connect } from "mongoose";
import * as dotenv from 'dotenv';
import logger from "../logging/logger";

const connectDB = async () => {
  try {
    const mongoURI: string | any = process.env.URI_STRING;
    await connect(mongoURI);
    logger.info('MongoDB Connected...');
  } catch (err: any) {
    logger.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;