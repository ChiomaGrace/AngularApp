const express = require('express')
const pokemonController = require("../controllers/pokemons"); //links the pokemon controller which has all the functions
const upload = require("../utils/multer");
const router = express.Router();


// console.log("This console log is coming from the routes.js file.");

router.post(
    `/submitPokemon`,  
    upload.single('file'), //middleware that will take the image, upload it to Cloudinary, and return a request.file object with the file information to the controller
    pokemonController.createPokemon,
);

// router.post('/submitPokemon', pokemonController.createPokemon);

router.get('/Pokemon', pokemonController.displayAllPokemon)

router.get('/getPokemon/:id', pokemonController.specificPokemon) //need the id in the params to retrieve the specific Pokemon


router.put(
    `/updatePokemon/:id`,  
    upload.single('file'),
    pokemonController.updatePokemon,
);

router.delete(
    `/deletePokemon/:id`,  
    upload.single('file'),
    pokemonController.deletePokemon,
);


module.exports = router; //helps to achieve module programming. Modular programming refers to separating the functionality of a program into independent, interchangeable modules, such that each contains everything necessary to execute only one aspect of the desired functionality.