const {response} = require('express');
const {Pokemon} = require('../models/pokemon');
const {cloudinary} = require('../utils/cloudinary'); //needed in order for the function to access the cloudinary acoount to upload image


const createPokemon = (request, response) => {
    console.log("This console log is from the create pokemon function in the controller with the data from the frontend:", "Request.body:", request.body, "Request.file:", request.file);
    submittedPokemon = new Pokemon()
        submittedPokemon.pokemonName = request.body.pokemonName;
        console.log("Pokemon Name:", submittedPokemon.pokemonName);
        if (request.file) {
            submittedPokemon.pokemonImage = request.file.path;
        }
        submittedPokemon.save()
            .then(submittedPokemonData => {
                console.log("This is the .then of the create Pokemon function in the controller saving the data:", submittedPokemonData);
                response.json(submittedPokemonData)
            })
            .catch(errors => {
                console.log("This is the .catch of the create Pokemon function in the controller, meaning saving the data errored:", errors);
                response.json(errors)
            })     
}


// const testFunction = (request, response) => {
//     console.log("This console log is from the test function in the controller.");
//     return response.json("test Function")
// }

module.exports = {createPokemon} 
