"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const ErrorResponse_1 = __importDefault(require("src/middlewares/error/ErrorResponse"));
const authRepo_1 = require("src/repositories/authRepo");
const Token_1 = require("src/utils/Token");
const tokenInstance = new Token_1.Token({
    secret: process.env.TOKEN_SECRET,
    signOptions: { expiresIn: "1d" },
    verifyOptions: {},
});
const userSignin = async (req, res, next) => {
    const { email, password } = res.locals.validData;
    try {
        const user = await (0, authRepo_1.findUserByEmail)(email);
        if (!user)
            return next(ErrorResponse_1.default.badRequest("The email address you entered is not registered."));
        const passwordMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!passwordMatch) {
            return next(ErrorResponse_1.default.unauthorized("The password you entered is incorrect"));
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
                tire: user.tier
            }
        });
    }
    catch (error) {
        return next(error.message || "Something went wrong");
    }
};
const userSignup = async (req, res, next) => {
    const { email, password, fullname } = res.locals.validData;
    try {
        const userExists = await (0, authRepo_1.findUserByEmail)(email);
        if (userExists)
            return next(ErrorResponse_1.default.badRequest("The email address you entered is already registered."));
        const newUser = await (0, authRepo_1.createUser)({
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
                tire: newUser.tier
            }
        });
    }
    catch (error) {
        return next(error.message || "Something went wrong");
    }
};
//# sourceMappingURL=authController.js.map