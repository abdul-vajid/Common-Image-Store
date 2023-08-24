import { NextFunction, Request, Response } from "express";


function cors(req: Request, res: Response, next: NextFunction) {
    const allowedOrigins: Array<string> = process.env.ALLOWED_ORIGINS.split(",");

    const origin = req.headers.origin as string;

    if (allowedOrigins.includes(origin)) {
        res.header("Access-Control-Allow-Origin", origin);
    }

    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Authorization, Accept"
    );
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    );

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    return next();
}
export default cors