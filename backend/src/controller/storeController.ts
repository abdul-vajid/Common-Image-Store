import { NextFunction, Request, Response } from "express";
import { handleFileUpload } from "../middlewares/fileUpload/cloudinary";
import ErrorResponse from "../middlewares/error/ErrorResponse";
import { createStore, findByUserId, updateStoreImages } from "../repositories/storeRepo";
import { getNext30thDayAt1159PM, timeDifferenceInHours } from "../utils/momentTimezone";
import { Image } from "../models/storeModel";
import { findUserById, updateTier } from "../repositories/userRepo";
import { stripe, subscriptionPlans } from "../utils/stripe";
import crypto from "crypto"
import { UserDoc } from "src/models/userModel";

export const uploadController = async (req: Request, res: Response, next: NextFunction) => {
    const { _id } = res.locals.deCode
    try {
        const user: UserDoc = await findUserById(_id);
        if (!user) {
            return next(ErrorResponse.unauthorized("Unauthorized access."));
        }
        
        
        if (user.tier === "FREE" && Array.isArray(req.files) && req.files.length > 1) {
            return next(ErrorResponse.badRequest("Free tier users can only upload one image at a time."));
        }
        
        const store = await findByUserId(_id);
        if (user.tier === "FREE" && store && store.lastUpload) {
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
        return res.status(200).json({
            success: true,
            message: !store ? "Your store is empty." : "Store successfully fetched",
            store: store ? store : null
        });
    } catch (error) {
        next(error)
    }
}

export const getPlansController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const plans = await subscriptionPlans();
        if (!plans) {
            return next(ErrorResponse.badRequest("Oops! can not found subscription plans."));
        }

        return res.status(200).json({
            success: true,
            message: "Plans fetched.",
            plans: plans
        })
    } catch (error) {
        next(error)
    }
}

export const subscriptionController = async (req: Request, res: Response, next: NextFunction) => {
    const { priceId } = req.body;
    try {
        if (!priceId) {
            return next(ErrorResponse.badRequest("Price Id not found."));
        }

        const verificationId: string = crypto.randomBytes(Math.ceil(10 / 2)).toString('hex').slice(0, 10);
        const session = await stripe.checkout.sessions.create(
            {
                mode: "subscription",
                payment_method_types: ["card"],
                line_items: [
                    {
                        price: priceId,
                        quantity: 1,
                    },
                ],

                success_url: `${process.env.SUCCESS_URL}/${verificationId}`,
                cancel_url: `${process.env.CANCLE_URL}/${verificationId}`,
                currency: "usd"
            },
            {
                apiKey: process.env.STRIPE_SECRET_KEY,
            }
        );
        return res.status(200).json({
            success: true,
            message: "Payment session.",
            data: {
                session,
                verificationId
            }
        });
    } catch (error) {
        next(error);
    }
}

export const verifyPaymentController = async (req: Request, res: Response, next: NextFunction) => {
    const { sessionId } = req.body;
    const { _id } = res.locals.deCode
    try {
        if (!sessionId) {
            return next(ErrorResponse.badRequest("Session Id not found."));
        }

        const retrievedSession = await stripe.checkout.sessions.retrieve(sessionId);
        if (retrievedSession.payment_status !== "paid") {
            return next(ErrorResponse.badRequest("We couldn't process your payment."));
        }

        const tireExpires = getNext30thDayAt1159PM();
        const updatedUser = await updateTier(_id, "PRO", tireExpires);

        res.status(200).json({
            success: true,
            messgae: "Your plan is upgraded.",
            user: updatedUser
        })
    } catch (error) {
        next(error)
    }
}