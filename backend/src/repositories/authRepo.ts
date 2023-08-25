import { User, UserAttrs, UserDoc } from "../models/userModel";

export const createUser = async (user: UserAttrs): Promise<UserDoc> => {
    try {
        const mongooseObject = new User(user);
        return (await mongooseObject.save()) as UserDoc;
    } catch (error) {
        throw new Error(error.message || "Somethinng went wrong! Try again later")
    }
};

export const findUserByEmail = async (email: string): Promise<UserDoc> => {
    try {
        const doc = await User.findOne({ email: email });
        return doc as UserDoc;
    } catch (error) {
        throw new Error(error.message || "Somethinng went wrong! Try again later")
    }
};