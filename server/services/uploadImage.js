import S3 from "aws-sdk/clients/s3.js";
// import dotenv from "dotenv";
import fs from "fs";
import crypto from "crypto";

// dotenv.config();
//AWS S3 Config
const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKey = process.env.AWS_ACCESS_KEY;
const secretKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
  region: region,
  accessKeyId: accessKey,
  secretAccessKey: secretKey,
  ACL: "public-read",
});

// Upload the image
export const uploadImageToBucket = (image, contentType) => {
  const fileStream = fs.createReadStream(image.path);
  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: "images/" + crypto.randomBytes(24).toString("hex"),
    ContentType: contentType,
  };

  return s3.upload(uploadParams).promise();
};

export const uploadProfileImageToBucket = (image, contentType) => {
  const fileStream = fs.createReadStream(image.path);
  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: "profile/" + crypto.randomBytes(24).toString("hex"),
    ContentType: contentType,
  };

  return s3.upload(uploadParams).promise();
};

// Download the image
