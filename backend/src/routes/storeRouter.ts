import express from 'express';
import { getStoreController, uploadController } from '../controller/storeController';
import { parseImages } from '../middlewares/fileUpload/multer';

const storeRouter = express.Router();

storeRouter.post('/upload', parseImages, uploadController);

storeRouter.get('/', getStoreController);

export { storeRouter };