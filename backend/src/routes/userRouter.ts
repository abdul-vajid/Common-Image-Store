import express from 'express';
import { userSigninController, userSignupController } from '../controller/userController';
import signinValidation from '../middlewares/validation/signinValidation';
import signupValidation from '../middlewares/validation/signupValidation';

const authRouter = express.Router();

authRouter.post('/signin', signinValidation, userSigninController);

authRouter.post('/signup', signupValidation, userSignupController);

export { authRouter };