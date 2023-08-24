import jwt from "jsonwebtoken";
import ErrorResponse from "../error/ErrorResponse";
import { NextFunction, Request, Response } from "express";

export const userAuthorization = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) return next(ErrorResponse.unauthorized("Unauthorized access"));

    let deCodedData: any;
    try {
        deCodedData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        if (!deCodedData.data.email || !deCodedData.data.userId) {
            return next(ErrorResponse.forbidden("Access forbidden"));
        }

        res.locals.deCode = deCodedData.data;
        return next();
    } catch (error) {
        return next(ErrorResponse.forbidden("Access forbidden"));
    }
};