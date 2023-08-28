import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2023-08-16",
});

export const subscriptionPlans = async () => {
    const prices = await stripe.prices.list({
        apiKey: process.env.STRIPE_SECRET_KEY,
    });

    const plans = [
        {
            title: "FREE TIER",
            amount: 0,
            interval: "mo",
            currency: "usd",
        },
        {
            title: "PRO TIER",
            amount: prices.data[0].unit_amount,
            interval: "mo",
            currency: prices.data[0].currency,
            priceId: prices.data[0].id,
        }
    ]

    return plans
}