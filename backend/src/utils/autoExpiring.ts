import moment from "moment-timezone";
import { UserDoc } from "../models/userModel";
import { findAllProUsers, updateTierByIds } from "../repositories/userRepo";

export const expiredProUsers = (users: UserDoc[]) => {
    const currentTime = moment.tz('Asia/Kolkata');
    const expiredProUsersIds: string[] = [];

    users.forEach(user => {
        const expiresAt = moment.tz(user.tierExpires, 'Asia/Kolkata');

        if (user.tier === 'PRO' && expiresAt.isBefore(currentTime)) {
            expiredProUsersIds.push(user._id);
        }
    });

    return expiredProUsersIds;
}

export const handleTierExpires = async () => {
    const users = await findAllProUsers();
    const expiredProUsersIds = expiredProUsers(users);

    updateTierByIds(expiredProUsersIds)
}