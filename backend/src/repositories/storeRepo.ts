import { Store, StoreDoc, StoreAttrs, Image } from "../models/storeModel"

export const findByUserId = async (_id: String): Promise<StoreDoc | null> => {
    try {
        const store = await Store.findOne({ userId: _id })
        return store
    } catch (error) {
        throw new Error(error.message || "Something went wrong")
    }
}

export const createStore = async (userId: string, images: Image[]): Promise<StoreDoc> => {
    try {
        const storeAttrs: StoreAttrs = {
            userId,
            lastUpload: new Date(),
            images,
        };

        const store = new Store(storeAttrs);
        await store.save();

        return store;
    } catch (error) {
        throw new Error(error.message || "Something went wrong while creating a store");
    }
}

export const updateStoreImages = async (userId: string, images: Image[]): Promise<StoreDoc | null> => {
    try {
        const existingStore = await Store.findOne({ userId });

        if (existingStore) {
            existingStore.images.push(...images);
            existingStore.lastUpload = new Date();
            await existingStore.save();
            return existingStore;
        }

        return null;
    } catch (error) {
        throw new Error(error.message || "Something went wrong while updating store images");
    }
}
