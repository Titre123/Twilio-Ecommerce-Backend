import { IsEmail, IsPhoneNumber, IsString, Length } from 'class-validator';

export class SignIn {
  @IsEmail()
  'email': string;

  @IsString()
  @Length(8, 20)
  'password': string;
}

export class ValidateCode {
  @IsString()
  @Length(6)
  'code': number;
}

export class SignUp extends SignIn {
  @IsString()
  'firstName': string;

  @IsString()
  'lastName' :string;

  @IsPhoneNumber()
  'phoneNumber': string;
}