// const multer = require("multer");
// const upload = multer();
// const cloudinary = require("cloudinary");
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const storage = new CloudinaryStorage({
//     folder: "PokemonImages",
//     allowedFormats: ["jpg", "png"],
//     transformation: [{
//         width: 500,
//         height: 500,
//         crop: "limit"
//     }],
//     cloudinary: cloudinary,
// });
// module.exports = multer({storage: storage});
// const upload = multer({storage: storage});

// module.exports = upload


// const storage = multer.diskStorage({
//     destination: './',
//     filename: function(request, file, callback) {
//         callback(null, Date.now() + '.' + file.mimetype.split('/')[1])
//     }
// })

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
router.post('/updateeocoverage', upload.single('myfile'), function (req, res, next) {
    res.json(JSON.parse(req.body.data))
  })