import { NextFunction, Request, Response } from "express";
import { handleFileUpload } from "../middlewares/fileUpload/cloudinary";
import ErrorResponse from "../middlewares/error/ErrorResponse";
import { createStore, findByUserId, updateStoreImages } from "../repositories/storeRepo";
import { timeDifferenceInHours } from "../utils/timeDifferenceInHours";
import { Image } from "../models/storeModel";

export const uploadController = async (req: Request, res: Response, next: NextFunction) => {
    const { _id, tier } = res.locals.deCode
    try {
        if (tier === "FREE" && Array.isArray(req.files) && req.files.length > 1) {
            return next(ErrorResponse.badRequest("Free tier users can only upload one image at a time."));
        }

        const store = await findByUserId(_id);
        if (tier === "FREE" && store && store.lastUpload) {
            const timeDifference = await timeDifferenceInHours(store.lastUpload);

            if (timeDifference < 1) {
                return next(ErrorResponse.badRequest("Free tier users are limited to uploading only one image per hour."));
            }
        }

        const uploadResult = await handleFileUpload(req);
        let images: Image[] = [];
        if (Array.isArray(uploadResult)) {
            images = uploadResult.map((item: Image) => ({
                public_id: item.public_id,
                url: item.url,
                signature: item.signature
            }));
        } else {
            images.push({
                public_id: uploadResult.public_id,
                url: uploadResult.url,
                signature: uploadResult.signature
            })

        }

        let updatedStore;
        !store ? updatedStore = await createStore(_id, images) : updatedStore = await updateStoreImages(_id, images);

        res.status(200).json({
            success: true,
            message: "Image uploaded",
            store: updatedStore
        })
    } catch (error) {
        next()
    }
}


export const getStoreController = async (req: Request, res: Response, next: NextFunction) => {
    const { _id } = res.locals.deCode
    try {
        const store = await findByUserId(_id);
        res.status(200).json({
            success: true,
            message: !store ? "Your store is empty." : "Store successfully fetched",
            store: store ? store : null
        });
    } catch (error) {
        next(error)
    }
}