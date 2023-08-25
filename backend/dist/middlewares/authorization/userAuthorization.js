"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAuthorization = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ErrorResponse_1 = __importDefault(require("../error/ErrorResponse"));
const userAuthorization = (req, res, next) => {
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token)
        return next(ErrorResponse_1.default.unauthorized("Unauthorized access"));
    let deCodedData;
    try {
        deCodedData = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if (!deCodedData.data.email || !deCodedData.data.userId) {
            return next(ErrorResponse_1.default.forbidden("Access forbidden"));
        }
        res.locals.deCode = deCodedData.data;
        return next();
    }
    catch (error) {
        return next(ErrorResponse_1.default.forbidden("Access forbidden"));
    }
};
exports.userAuthorization = userAuthorization;
//# sourceMappingURL=userAuthorization.js.map