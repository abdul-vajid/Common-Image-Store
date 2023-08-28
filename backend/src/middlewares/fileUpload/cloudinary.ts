import { Request } from "express";
import { UploadApiResponse } from "cloudinary";
import DataURIParser from "datauri/parser.js";
import path from "path";
import configureCloudinary from "../../config/configureCloudinary";

const dUri = new DataURIParser();

interface UploadedFile {
    originalname: string;
    buffer: Buffer;
}

export const singleFileUpload = async (
    file: UploadedFile
): Promise<UploadApiResponse> => {
    const formattedFile = dUri.format(
        path.extname(file.originalname).toString(),
        file.buffer
    );

    const result = await configureCloudinary().uploader.upload(formattedFile.content, {
        folder: "commonCloudStore",
    });

    return result;
};

export const multipleFileUpload = async (
    files: UploadedFile[]
): Promise<UploadApiResponse[]> => {
    const promises = files.map(async (file) => {
        try {
            const formattedFile = dUri.format(
                path.extname(file.originalname).toString(),
                file.buffer
            );

            const result = await configureCloudinary().uploader.upload(formattedFile.content, {
                folder: "commonCloudStore",
            });

            return result;
        } catch (error) {
            throw new Error(error)
        }
    });

    const results = await Promise.all(promises);
    return results;
};

export const handleFileUpload = async (req: Request): Promise<UploadApiResponse | UploadApiResponse[]> => {

    if (req.file) {
        const singleFile = req.file;
        const singleUploadResult = await singleFileUpload(singleFile);
        return singleUploadResult;
    } else if (req.files) {
        const multipleFiles = req.files as UploadedFile[];
        const multipleUploadResults = await multipleFileUpload(multipleFiles);
        return multipleUploadResults;
    } else {
        throw new Error("No file(s) to upload.");
    }
};
