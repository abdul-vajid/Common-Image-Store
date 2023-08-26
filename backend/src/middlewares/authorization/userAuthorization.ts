import jwt from "jsonwebtoken";
import ErrorResponse from "../error/ErrorResponse";
import { NextFunction, Request, Response } from "express";

export const userAuthorization = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) return next(ErrorResponse.unauthorized("Unauthorized access"));

    let deCodedData: any;
    res.locals.deCode = {}
    try {
        deCodedData = jwt.verify(token, process.env.TOKEN_SECRET);

        if (!deCodedData.email || !deCodedData._id) {
            return next(ErrorResponse.forbidden("Access forbidden"));
        }

        res.locals.deCode = deCodedData;
        return next();
    } catch (error) {
        return next(ErrorResponse.forbidden("Access forbidden"));
    }
};