"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserByEmail = exports.createUser = void 0;
const userModel_1 = require("src/models/userModel");
const createUser = async (user) => {
    try {
        const mongooseObject = new userModel_1.User(user);
        return (await mongooseObject.save());
    }
    catch (error) {
        throw new Error(error.message || "Somethinng went wrong! Try again later");
    }
};
exports.createUser = createUser;
const findUserByEmail = async (email) => {
    try {
        const doc = await userModel_1.User.findOne({ email: email });
        return doc;
    }
    catch (error) {
        throw new Error(error.message || "Somethinng went wrong! Try again later");
    }
};
exports.findUserByEmail = findUserByEmail;
//# sourceMappingURL=authRepo.js.map