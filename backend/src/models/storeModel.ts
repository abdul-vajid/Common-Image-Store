import mongoose from "mongoose";

export interface Image {
    url: string,
    public_id: string,
    signature: string,
}

interface StoreAttrs {
    userId: String;
    lastUpload: Date;
    images: Image[];
}

interface StoreModal extends mongoose.Model<StoreDoc> {
    build(attrs: StoreAttrs): StoreDoc;
}

interface StoreDoc extends mongoose.Document {
    userId: mongoose.Schema.Types.ObjectId;
    lastUpload: Date;
    images: Image[]
    updatedAt: Date;
    version: number;
}

const storeSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            unique: true
        },
        lastUpload: {
            type: Date,
            required: false,
        },
        images: [{
            url: {
                type: String,
                required: true,
            },
            public_id: {
                type: String,
                required: true,
            },
            signature: {
                type: String,
                required: true,
            }
        }],
    }
);

const Store = mongoose.model<StoreDoc, StoreModal>("Store", storeSchema);

export { Store, StoreDoc, StoreAttrs };