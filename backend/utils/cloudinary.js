import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";


// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// file path from multer
export const UploadOnCloud = async (filepath) => {
  try {
    if (!filepath) return null;
    const uploadResult = await cloudinary.uploader.upload(filepath, {
      resource_type: "auto",
    });
    //after uploading delete the file from temp folder
    fs.unlinkSync(filepath);
    return uploadResult;
  } catch (error) {
    fs.unlinkSync(filepath);
    console.error("cloudinary upload error: ", error);
    return null;
  }
};

export const DeleteFromCloud = async (imageUrl) => {
  try {
    if (!imageUrl) return null;
    const publicId = imageUrl.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
  }
};
