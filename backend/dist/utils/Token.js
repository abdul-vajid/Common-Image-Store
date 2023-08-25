"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Token {
    constructor(dependencies) {
        this.generate = (payload) => {
            const token = jsonwebtoken_1.default.sign(payload, this.dependencies.secret, {
                ...this.dependencies.signOptions,
            });
            return token;
        };
        this.verify = (token) => {
            try {
                const decoded = jsonwebtoken_1.default.verify(token, this.dependencies.secret, {
                    ...this.dependencies.verifyOptions,
                });
                return decoded;
            }
            catch (error) {
                if (error.name === "TokenExpiredError") {
                    throw new Error("Token has expired");
                }
                else if (error.name === "JsonWebTokenError") {
                    throw new Error("Invalid token");
                }
                else {
                    throw error;
                }
            }
        };
        this.dependencies = dependencies;
    }
}
exports.Token = Token;
//# sourceMappingURL=Token.js.map