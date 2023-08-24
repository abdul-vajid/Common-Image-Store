import express from 'express';

const storeRouter = express.Router();

storeRouter.post('/signin');

storeRouter.post('/signup');

export { storeRouter };