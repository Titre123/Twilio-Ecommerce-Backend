import { createTransport, Transporter } from 'nodemailer';
import * as dotenv from 'dotenv';
import { Nodemailerservice, EmailMessage, EmailSendInfo } from './mailer.interface';
import logger from '../../utils/logging/logger';

dotenv.config();

// Create the transporter
const transporter: Transporter = createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_EMAIL, // SMTP email address
    pass: process.env.NODEMAILER_AUTH // SMTP email password or app password
  }
});

export default class NodemailerserviceImplement implements Nodemailerservice {
  private transporter: Transporter;

  constructor() {
    this.transporter = transporter; // Assign the created transporter to the instance variable
  }

  async sendEmail(options: EmailMessage): Promise<EmailSendInfo> {
    try {
      return await this.transporter.sendMail(options); // Send the email using the transporter
    } catch (e: any) {
      logger.error(e);
      throw new Error(e);
    }
  }
}
