"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
exports.default = () => {
    const uri = process.env.MONGO_URI;
    mongoose_1.default.set("strictQuery", false);
    mongoose_1.default
        .connect(uri)
        .then(() => {
        console.log("Database connected");
    })
        .catch((err) => {
        console.log(`Database connection failed : ${err}`);
    });
};
//# sourceMappingURL=database.js.map