import { NextFunction, Request, Response } from "express";
import ErrorResponse from "../middlewares/error/ErrorResponse";
import crypto from "crypto"
import { stripe, subscriptionPlans } from "../utils/stripe";
import { getNext30thDayAt1159PM } from "../utils/momentTimezone";
import { updateTier } from "../repositories/userRepo";

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

        const tierExpires = getNext30thDayAt1159PM();
        const updatedUser = await updateTier(_id, "PRO", tierExpires);

        res.status(200).json({
            success: true,
            messgae: "Your plan is upgraded.",
            user: updatedUser
        })
    } catch (error) {
        next(error)
    }
}

export const unsubscribtionController = async (req: Request, res: Response, next: NextFunction) => {
    const { _id } = res.locals.deCode
    try {
        const updatedUser = await updateTier(_id, "FREE", null);
        if (!updatedUser) return next(ErrorResponse.unauthorized("Unauthorized access."));

        return res.status(200).json({
            success: true,
            message: "You have unsubscribed from the Pro Tier access.",
            user: updatedUser
        })

    } catch (error) {

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