export interface TwilioClient {
  messages: {
    create: (message: TwilioMessage) => Promise<TwilioMessageResult>;
  };
}

export interface TwilioMessage {
  body: string;
  to: string;
  from: string | undefined;
}

export interface TwilioMessageResult {
  sid: string;
  status: string;
}