const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const region = process.env.AWS_REGION || "ap-southeast-1";
const bucketName = process.env.S3_BUCKET_NAME;
const cloudFrontDomain = process.env.CLOUDFRONT_DOMAIN;

const s3Client = new S3Client({ region });

const uploadToS3 = async ({ key, buffer, contentType }) => {
  if (!bucketName || !cloudFrontDomain) {
    throw new Error("S3 atau CloudFront belum dikonfigurasi.");
  }

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    Body: buffer,
    ContentType: contentType,
  });

  try {
    await s3Client.send(command);
  } catch (error) {
    console.error("ERROR UPLOAD S3:", error);
    throw error;
  }

  return `https://${cloudFrontDomain}/${key}`;
};

module.exports = {
  uploadToS3,
};
