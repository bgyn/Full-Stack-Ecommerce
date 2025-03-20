"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileSignedUrl = exports.uploadFile = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const s3 = new client_s3_1.S3Client({
    endpoint: process.env.R2_ENDPOINT,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
    region: process.env.R2_REGION,
});
const uploadFile = (fileBuffer, fileName, bucket, path, mimeType) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fileKey = `${path}/${fileName}`;
        const params = {
            Bucket: bucket,
            Key: fileKey,
            Body: fileBuffer,
            ContentType: mimeType,
        };
        const command = new client_s3_1.PutObjectCommand(params);
        yield s3.send(command);
        console.log(`File uploaded successfully: ${fileName}`);
    }
    catch (err) {
        console.error("Error uploading file:", err);
        throw new Error("Failed to upload file");
    }
});
exports.uploadFile = uploadFile;
const getFileSignedUrl = (bucket, fileKey) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const command = new client_s3_1.GetObjectCommand({
            Bucket: bucket,
            Key: fileKey,
        });
        const signedUrl = yield (0, s3_request_presigner_1.getSignedUrl)(s3, command, { expiresIn: 3600 });
        return signedUrl;
    }
    catch (err) {
        console.error("Error generating signed URL:", err);
        throw new Error("Failed to generate signed URL");
    }
});
exports.getFileSignedUrl = getFileSignedUrl;
