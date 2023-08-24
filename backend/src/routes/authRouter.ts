import express from 'express';

const authRouter = express.Router();

authRouter.post('/signin');

authRouter.post('/signup');

export { authRouter };