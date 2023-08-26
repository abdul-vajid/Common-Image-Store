import mongoose from "mongoose";
import bcrypt from "bcryptjs";

interface UserAttrs {
    email: string;
    password: string;
    fullname: string;
    tier?: "FREE" | "PRO";
    tireExpires?: Date;
}

interface UserModal extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}

interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
    fullname: string;
    tier: "FREE" | "PRO";
    tireExpires?: Date;
    updatedAt: Date;
    version: number;
}

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
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
        },
        tireExpires: {
            type: Date,
            required: false,
        }
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.password;
            },
        },
    }
);

userSchema.pre("save", async function (done) {
    const user = this as UserDoc;
    if (user.isModified("password")) {
        const saltRounds: number = Number(process.env.SALT_ROUNDS);
        const generatedSalt: string = await bcrypt.genSalt(saltRounds);

        const hashedPassword = await bcrypt.hash(user.get("password"), generatedSalt);
        user.set("password", hashedPassword);
    }
    done();
});

const User = mongoose.model<UserDoc, UserModal>("User", userSchema);

export { User, UserDoc, UserAttrs};