const multer = require('multer'); //needed in order to save file uploads
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');


const storage =  new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "PokemonImages",
    allowedFormats: ["jpg", "png"],
    transformation: [{ width: 500, height: 500, crop: "limit" }],
    fieldname: (request, file, callback) => {
      console.log(file);
      file.fieldname = file.originalname
      console.log("filename", file.fieldname);
      console.log("Changed filename:", file)
      const fieldname = file.originalname
    },
    // use_filename: true,
    // use_fieldname: true,
    // unique_filename: false,
  }
});
module.exports = multer({storage: storage}); //so the middleware can be used on the routes.js file
