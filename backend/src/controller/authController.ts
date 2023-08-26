import { Request, Response, NextFunction } from "express"
import bcrypt from "bcryptjs"
import ErrorResponse from "../middlewares/error/ErrorResponse";
import { UserDoc } from "../models/userModel";
import { createUser, findUserByEmail } from "../repositories/authRepo";
import { Token } from "../utils/Token";

const tokenInstance = new Token({
    secret: process.env.TOKEN_SECRET,
    signOptions: { expiresIn: "1d" },
    verifyOptions: {},
});

export const userSigninController = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = res.locals.validData;
    try {
        const user: UserDoc = await findUserByEmail(email);

        if (!user) return next(ErrorResponse.badRequest("The email address you entered is not registered."));

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return next(ErrorResponse.unauthorized("The password you entered is incorrect"));
        }

        const payload = {
            email: user.email,
            _id: user._id,
            tier: user.tier
        };

        const generatedToken = tokenInstance.generate(payload);

        res.status(201).json({
            success: true,
            message: "Account successfully created",
            accessToken: generatedToken,
            data: {
                email: user.email,
                fullname: user.fullname,
                tier: user.tier
            }
        });
    } catch (error) {
        return next(error.message || "Something went wrong")
    }
};

export const userSignupController = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, fullname } = res.locals.validData;
    try {
        const userExists: UserDoc = await findUserByEmail(email);

        if (userExists) return next(ErrorResponse.badRequest("The email address you entered is already registered."));

        const newUser: UserDoc = await createUser({
            email,
            password,
            fullname
        });

        const payload = {
            email: newUser.email,
            _id: newUser._id,
            tier: newUser.tier
        };

        const generatedToken = tokenInstance.generate(payload);

        res.status(201).json({
            success: true,
            message: "Account successfully created",
            accessToken: generatedToken,
            data: {
                email: newUser.email,
                fullname: newUser.fullname,
                tier: newUser.tier
            }
        });
    } catch (error) {
        return next(error.message || "Something went wrong")
    }
}