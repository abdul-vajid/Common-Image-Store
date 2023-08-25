"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userAuthorization_1 = require("../middlewares/authorization/userAuthorization");
const authRouter_1 = require("./authRouter");
const storeRouter_1 = require("./storeRouter");
const routes = express_1.default.Router();
routes.use("/auth", userAuthorization_1.userAuthorization, authRouter_1.authRouter);
routes.use("/", userAuthorization_1.userAuthorization, storeRouter_1.storeRouter);
exports.default = routes;
//# sourceMappingURL=index.js.map