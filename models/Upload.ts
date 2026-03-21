import { Schema, model, models } from "mongoose";

export type UploadDocument = {
    filename: string;
    originalName?: string;
    contentType: string;
    data: Buffer;
    createdAt: Date;
};

const uploadSchema = new Schema<UploadDocument>(
    {
        filename: { type: String, required: true, trim: true, unique: true },
        originalName: { type: String, trim: true },
        contentType: { type: String, required: true, trim: true },
        data: { type: Buffer, required: true },
        createdAt: { type: Date, default: Date.now }
    },
    { versionKey: false }
);

const Upload = models.Upload || model<UploadDocument>("Upload", uploadSchema);

export default Upload;
