import * as dotenv from 'dotenv';
import twilio from 'twilio';
import { TwilioClient, TwilioMessageResult, TwilioMessage } from './twilio.interface';
import twilioSendMessage from './twilio.service';

dotenv.config();

export default class TwilioConfig {

  private accountSid: string | undefined;
  private authToken: string | undefined;
  private client: TwilioClient;

  constructor() {
    this.accountSid = process.env.TWILIO_ACCOUNT_SID;
    this.authToken = process.env.TWILIO_AUTH_TOKEN;
    this.client = twilio(this.accountSid, this.authToken);
  }

  public async twilioSendMessage(message: TwilioMessage) {
    const messageResult: TwilioMessageResult = await twilioSendMessage(message, this.client);
    return messageResult;
  }

}