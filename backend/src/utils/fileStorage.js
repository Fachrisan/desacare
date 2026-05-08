const path = require("path");
const { uploadToS3 } = require("../config/s3");

const sanitizeFilename = (filename) =>
  path
    .basename(filename || "file")
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9._-]/g, "");

const storeFile = async (file, folder) => {
  if (!file) return null;

  const timestamp = Date.now();
  const safeFilename = sanitizeFilename(file.originalname);
  const key = `${folder}/${timestamp}-${safeFilename}`;

  return uploadToS3({
    key,
    buffer: file.buffer,
    contentType: file.mimetype,
  });
};

module.exports = {
  storeFile,
};
