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

export const findUserById = async (_id: string): Promise<UserDoc> => {
    try {
        const doc = await User.findById(_id);
        return doc as UserDoc;
    } catch (error) {
        throw new Error(error.message || "Somethinng went wrong! Try again later")
    }
};

export const updateTier = async (_id: string, tier: string, tierExpires: Date | null): Promise<UserDoc> => {
    try {
        const options = { new: true };
        const doc = await User.findOneAndUpdate({ _id }, {
            $set: {
                tier,
                tierExpires
            }
        }, options);

        return doc as UserDoc;
    } catch (error) {
        throw new Error(error.message || "Something went wrong! Try again later");
    }
};

export const findAllProUsers = async (): Promise<UserDoc[]> => {
    try {
        const users = await User.find({
            tier: "PRO"
        });
        return users as UserDoc[];
    } catch (error) {
        throw new Error(error.message || "Somethinng went wrong! Try again later")
    }
};

export const updateTierByIds = (expiredUserIds: string[]) => {
    try {
        User.updateMany(
            { _id: { $in: expiredUserIds } },
            { $set: { tier: "FREE", tierExpires: null } }
        );
    } catch (error) {
        throw new Error(error.message || "Somethinng went wrong! Try again later")
    }
};