const fs = require("fs");
const path = require("path");
const { hasS3Config, uploadToS3 } = require("../config/s3");

const uploadsDir = path.resolve(__dirname, "../../uploads");

const ensureUploadsDir = () => {
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
};

const storeFile = async (file, folder) => {
  if (!file) return null;

  const ext = path.extname(file.originalname) || "";
  const safeName = `${folder}-${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;

  if (hasS3Config) {
    const key = `${folder}/${safeName}`;
    return uploadToS3({
      key,
      buffer: file.buffer,
      contentType: file.mimetype,
    });
  }

  ensureUploadsDir();
  const localPath = path.join(uploadsDir, safeName);
  fs.writeFileSync(localPath, file.buffer);
  return `/uploads/${safeName}`;
};

module.exports = {
  storeFile,
};
