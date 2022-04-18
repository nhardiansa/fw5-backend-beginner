const fs = require('fs');
const cloudinary = require('cloudinary').v2;

const {
  CLOUD_NAME,
  CLOUD_API_KEY,
  CLOUD_API_SECRET,
  CLOUD_MAIN_FOLDER
} = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET
});

exports.deleteFile = (path) => {
  if (path) {
    // fs.rm(path, err => {
    //   if (err) console.error(err);
    // });

    const publicId = `${CLOUD_MAIN_FOLDER}${path.split(CLOUD_MAIN_FOLDER)[1]}`.split('.').shift();
    // console.log(publicId, CLOUD_MAIN_FOLDER);
    cloudinary.uploader.destroy(publicId, (err, result) => {
      if (err) console.error(err);
    });
  }
};

exports.deleteCloudinaryFile = (publicId) => {
  if (publicId) {
    cloudinary.uploader.destroy(publicId, (err, result) => {
      if (err) console.error(err);
    });
  }
};
