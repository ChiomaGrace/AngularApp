const express = require('express')
const router = express.Router()
const path = require('path');
const pokemonController = require("../controllers/pokemons"); //links the pokemon controller which has all the functions


router.get('/', (request, response) => {
    // response.send("This is a test response from routes.js. If successful, this would display as the html in the browser on port 8000.")
    response.sendFile(path.join(__dirname, '../../../frontend/dist/angular-app/browser/index.html' ));
    console.log("This console log in the terminal is coming from the root route in routes.js")
});

router.post('/submitPokemon', pokemonController.createPokemon);




module.exports = router; //helps to achieve module programming. Modular programming refers to separating the functionality of a program into independent, interchangeable modules, such that each contains everything necessary to execute only one aspect of the desired functionality.