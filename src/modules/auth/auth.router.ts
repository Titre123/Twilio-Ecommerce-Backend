import { Router } from 'express';
import AuthController from './auth.controller';
import RequestValidator from '../../commons/validate';
import { SignIn, SignUp, ValidateCode } from './auth.validation';

const authRouter = Router();

// POST /signup
authRouter.post('/signup', RequestValidator.validate(SignUp), AuthController.createUser);

// POST /signin
authRouter.post('/signin', RequestValidator.validate(SignIn), AuthController.signUser);

// POST /sendcode
authRouter.get('/sendcode/:token', AuthController.sendCode);

// POST /verifycode
authRouter.post('/verifycode/:token', RequestValidator.validate(ValidateCode), AuthController.verifyCode);

export default authRouter;
