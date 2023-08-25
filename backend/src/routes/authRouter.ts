import express from 'express';
import { userSignin, userSignup } from '../controller/authController';
import signinValidation from '../middlewares/validation/signinValidation';
import signupValidation from '../middlewares/validation/signupValidation';

const authRouter = express.Router();

authRouter.post('/signin', signinValidation, userSignin);

authRouter.post('/signup', signupValidation, userSignup);

export { authRouter };