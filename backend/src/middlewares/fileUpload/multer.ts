import multer, { FileFilterCallback } from "multer";
import { Request, Response, NextFunction } from "express";

import ErrorResponse from "../error/ErrorResponse";

const storage = multer.memoryStorage();

const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
) => {
    if (!["image/png", "image/jpg", "image/jpeg"].includes(file?.mimetype)) {
        return cb(new Error("Not an image"));
    }
    return cb(null, true);
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5242880 },
});


export const parseImages = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    upload.array("images")(req, res, (err: any) => {
        if (err) {
            if (err.message === "Not an image") {
                return next(ErrorResponse.badRequest("Please provide valid images"));
            }
            if (err.message === "File too large") {
                return next(ErrorResponse.badRequest("File is too large"));
            }
            upload.single("images")(req, res, (err: any) => {
                if (err) {
                    if (err.message === "Not an image") {
                        return next(ErrorResponse.badRequest("Please provide a valid image"));
                    }
                    if (err.message === "File too large") {
                        return next(ErrorResponse.badRequest("File is too large"));
                    }
                    return next(ErrorResponse.internalError("Something went wrong"));
                }
                return next();
            });
        }
        return next();
    });
};