import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import ErrorResponse from "../error/ErrorResponse";

const signupSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "string.base": "Email must be a string",
        "string.empty": "Email field cannot be left empty",
        "string.email": "Email field must be a valid email address",
        "any.required": "Email field is required",
    }),
    password: Joi.string()
        .min(8)
        .max(16)
        .required()
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        .messages({
            "string.base": "Password must be a string",
            "string.empty": "Password cannot be left empty",
            "string.min": "Password must be at least 8 characters",
            "string.max": "Password must be at most 16 characters.",
            "string.pattern.base": "Password must include at least one lowercase letter, one uppercase letter, one digit, and one special character (@, $, !, %, *, ?, &)",
            "any.required": "Password field is required",
        }),
    fullname: Joi.string().required().messages({
        "string.base": "Fullname must be a string",
        "string.empty": "Fullname field cannot be left empty",
        "any.required": "Fullname field is required",
    }),
});

const signupValidation = (req: Request, res: Response, next: NextFunction) => {
    res.locals.validData = {};
    const { email, password, fullname } = req.body;
    const { value: data, error } = signupSchema.validate({ email, password, fullname }, { abortEarly: true });

    if (error) {
        next(ErrorResponse.badRequest(error.message));
    } else {
        res.locals.validData = data;
        next();
    }
};

export default signupValidation;