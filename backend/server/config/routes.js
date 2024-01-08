const express = require('express')
const pokemonController = require("../controllers/pokemons"); //links the pokemon controller which has all the functions
require("../utils/cloudinary");
const upload = require("../utils/multer");
const router = express.Router();
const multer  = require('multer')

console.log("This console log is coming from the routes.js file.");

// router.get('/', (request, response) => {
//     // response.send("This is a test response from routes.js. If successful, this would display as the html in the browser on port 8000.")
//     response.sendFile(path.join(__dirname, '../../../frontend/dist/angular-app/browser/index.html' ));
//     console.log("This console log in the terminal is coming from the root route in routes.js")
// });

router.post(
    // "",
    // upload.single("pokemonImage"),
    // '/submitPokemon'
    // pokemonController.createPokemon
    '/submitPokemon', pokemonController.createPokemon
);


// router.post("/", upload.single("image"), async (req, res) => {
//     try {
//       // Upload image to cloudinary
//       const result = await cloudinary.uploader.upload(req.file.path);
//       // Create new user
//       let user = new User({
//         name: req.body.name,
//         profile_img: result.secure_url,
//         cloudinary_id: result.public_id,
//       });
//       // save user details in mongodb
//       await user.save();
//       res.status(200)
//         .send({
//           user
//         });
//     } catch (err) {
//       console.log(err);
//     }
//   });

// router.post('/submitPokemon', upload.single('file'), (request, response) => {})

module.exports = router; //helps to achieve module programming. Modular programming refers to separating the functionality of a program into independent, interchangeable modules, such that each contains everything necessary to execute only one aspect of the desired functionality.