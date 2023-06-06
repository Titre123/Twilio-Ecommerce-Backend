import sha1 from 'sha1';
import * as dotenv from 'dotenv';
import { User, userSignInPayload } from './auth.interface';
import { AuthError, ConflictError, NotAuthorizedError, BadRequestError } from "../../commons/error";
import userModel from '../../utils/db/userdb/userdb.model';
import TwilioConfig from '../otp/twilio.controller';
import { verifyJWT } from '../../utils/jwt/jwt';
import NodemailerserviceImplement from '../mail/mailer.controller';
import emailTemplate from '../mail/mail.service';
import otpModel from '../../utils/db/otpdb/otp.model';

dotenv.config();


export default class AuthRepository {
  private userModel;
  private otpModel;
  private twilioServive;
  private nodemailerService;

  constructor () {
    this.userModel = userModel;
    this.otpModel = otpModel;
    this.twilioServive = new TwilioConfig();
    this.nodemailerService = new NodemailerserviceImplement();
  }

  public async addUser(userPayload: User) {
    const { firstName, lastName, email, phoneNumber, password } = userPayload;

    const user = await this.userModel.findOne({ email });
    if (user) {
      throw new ConflictError();
    }

    const hashedPassword = sha1(password);
    const newUser = await this.userModel.create({ firstName, lastName, phoneNumber, email, password: hashedPassword });

    return newUser;
  }

  public async signUser(userPayload: userSignInPayload) {
    const { email, password } = userPayload;

    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new AuthError('User does not exist');
    }

    const hashedPassword = sha1(password);
    if (hashedPassword !== user.password) {
      throw new NotAuthorizedError();
    }

    return user;
  }

  public async sendCode(token: string) {
    const userPayload = verifyJWT(token);
    const user = await this.userModel.findById(userPayload.id);
    if (!user) throw new AuthError('User does not exist');
    const recipientEmail = user.email;
    const otp = Math.floor(Math.random() * 900000) + 100000;
    const htmlTemplate = emailTemplate.replace('{{otp}}', `${otp}`);
    const mailOptions = {
      from: 'sender@example.com', // Replace with your email address
      to: recipientEmail,
      subject: 'OTP Email',
      html: htmlTemplate
    };
    const messageResult = await this.twilioServive.twilioSendMessage({body: `Your OTP is: ${otp}. Please use this OTP to proceed`, from: process.env.TWILIO_PHONE, to: user.phoneNumber});
    const infoResult = await this.nodemailerService.sendEmail(mailOptions);
    await this.otpModel.create({phoneNumber: user.phoneNumber, code: otp.toString()});
    return {messageResult, infoResult};
  }

  public async verifyCode(code: any, token: string) {
    const userPayload = verifyJWT(token);
    const user = await this.userModel.findById(userPayload.id);
    if (!user) throw new AuthError('User does not exist');
    const gottenCode = await this.otpModel.findOne({code: code, phoneNumber: user.phoneNumber});
    if (!gottenCode) throw new AuthError('OTP code is not correct');
    await this.userModel.updateOne(
      {email: user.email},
      {$setOnInsert: { verified: true }}
    )
    await this.otpModel.deleteMany({phoneNumber: user.phoneNumber});
    return true;
  }
}
