import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import ErrorResponse from "../error/ErrorResponse";

const signinSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "string.base": "Email must be a string",
        "string.empty": "Email field cannot be left empty",
        "string.email": "Email field must be a valid email address",
        "any.required": "Email field is required",
    }),
    password: Joi.string().required().messages({
        "string.base": "Password must be a string",
        "string.empty": "Password field cannot be left empty",
        "any.required": "Password field is required",
    }),
});

const signinValidation = (req: Request, res: Response, next: NextFunction) => {
    res.locals.validData = {};
    const { email, password } = req.body;
    const { value: data, error } = signinSchema.validate({ email, password }, { abortEarly: true });

    if (error) {
        next(ErrorResponse.badRequest(error.message));
    } else {
        res.locals.validData = data;
        next();
    }
};

export default signinValidation;