import { v2 as cloudinary } from "cloudinary";import fs from "fs";
import streamifier from 'streamifier'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const uploadOnCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "movies" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

// const uploadOnCloudinary = async (localFilePath) => {
//   try {
//     if (!localFilePath) return null;
//     //Upload the file on cloudinary
//     const response = await cloudinary.uploader.upload(localFilePath, {
//       resource_type: "auto",
//     });

//     fs.unlink(localFilePath, (err) => {
//       if (err) console.error("Temp file delete failed:", err);
//     });
//     //File has been uploaded successfull
//     console.log("File is uploaded on cloudinary", response.url);
//     return response;
//   } catch (error) {
//     if (fs.existsSync(localFilePath)) {
//       fs.unlinkSync(localFilePath); // remove the local saved temporary file as the upload operation got failed
//     }
//     return null;
//   }
// };

export { uploadOnCloudinary };