import express from 'express';
import { subscriptionController, unsubscribtionController, verifyPaymentController, getPlansController } from '../controller/subscriptionController';

const subsRouter = express.Router();

subsRouter.post('/', subscriptionController)

subsRouter.get('/', getPlansController)

subsRouter.put('/', unsubscribtionController)

subsRouter.post('/verify-payment', verifyPaymentController)




export { subsRouter };