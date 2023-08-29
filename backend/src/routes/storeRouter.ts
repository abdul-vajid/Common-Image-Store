import express from 'express';
import { getPlansController, getStoreController, subscriptionController, unsubscribtionController, uploadController, verifyPaymentController } from '../controller/storeController';
import { parseImages } from '../middlewares/fileUpload/multer';

const storeRouter = express.Router();

storeRouter.post('/upload', parseImages, uploadController);

storeRouter.get('/plans', getPlansController)

storeRouter.post('/subscribe', subscriptionController)

storeRouter.post('/verify-payment', verifyPaymentController)

storeRouter.post('/unsubscribe', unsubscribtionController)

storeRouter.get('/', getStoreController);

export { storeRouter };