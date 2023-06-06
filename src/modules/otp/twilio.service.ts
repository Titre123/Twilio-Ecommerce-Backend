import {TwilioMessage, TwilioClient} from "./twilio.interface";

export default async function twilioSendMessage(message: TwilioMessage, client: TwilioClient) {
  return await client.messages.create(message);
}