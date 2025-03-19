import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";

dotenv.config();
const s3 = new S3Client({
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
  region: process.env.R2_REGION,
});

export const uploadFile = async (
  fileBuffer: Buffer,
  fileName: string,
  bucket: string,
  path: string,
  mimeType: string
) => {
  try {
    const params = {
      Bucket: bucket,
      Key: `${path}/${fileName}`,
      Body: fileBuffer,
      ContentType: mimeType,
    };

    const command = new PutObjectCommand(params);
    await s3.send(command);

    console.log(`File uploaded successfully: ${fileName}`);
  } catch (err) {
    console.error("Error uploading file:", err);
    throw new Error("Failed to upload file");
  }
};
