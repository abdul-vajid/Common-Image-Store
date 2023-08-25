"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    fullname: {
        type: String,
        required: true,
    },
    tier: {
        type: String,
        enum: ["FREE", "PRO"],
        default: "FREE"
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
        },
    },
});
userSchema.pre("save", async function (done) {
    const user = this;
    if (user.isModified("password")) {
        const saltRounds = Number(process.env.SALT_ROUNDS);
        const generatedSalt = await bcryptjs_1.default.genSalt(saltRounds);
        const hashedPassword = await bcryptjs_1.default.hash(user.get("password"), generatedSalt);
        user.set("password", hashedPassword);
    }
    done();
});
const User = mongoose_1.default.model("User", userSchema);
exports.User = User;
//# sourceMappingURL=userModel.js.map