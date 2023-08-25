"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const authRouter = express_1.default.Router();
exports.authRouter = authRouter;
authRouter.post('/signin');
authRouter.post('/signup');
//# sourceMappingURL=authRouter.js.map