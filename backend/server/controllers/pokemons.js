const {response} = require('express');
const {Pokemon} = require('../models/pokemon');

const createPokemon = (request, response) => {
    console.log("This console log is from the create pokemon function in the controller:", request.body);
    submittedPokemon = new Pokemon()
        submittedPokemon.pokemonName = request.body.pokemonName
        submittedPokemon.pokemonImage = request.body.pokemonImage
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
