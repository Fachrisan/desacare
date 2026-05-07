const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const hasS3Config = Boolean(
  process.env.AWS_S3_BUCKET &&
    process.env.AWS_REGION &&
    process.env.AWS_ACCESS_KEY_ID &&
    process.env.AWS_SECRET_ACCESS_KEY
);

const s3Client = hasS3Config
  ? new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    })
  : null;

const uploadToS3 = async ({ key, buffer, contentType }) => {
  if (!s3Client || !process.env.AWS_S3_BUCKET) {
    throw new Error("S3 belum dikonfigurasi.");
  }

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
    Body: buffer,
    ContentType: contentType,
  });

  await s3Client.send(command);

  return `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
};

module.exports = {
  hasS3Config,
  uploadToS3,
};
