const {response} = require('express');
const {Pokemon} = require('../models/pokemon');
const {cloudinary} = require('../utils/cloudinary'); //needed in order for the function to access the cloudinary acoount to upload image

// const testFunction = (request, response) => {
//     console.log("This console log is from the test function in the controller.");
//     return response.json("test Function")
// }

const createPokemon = (request, response) => {
    // console.log("This console log is from the create pokemon function in the controller with the data from the frontend:", "Request.body:", request.body, "Request.file:", request.file);
    submittedPokemon = new Pokemon()
        submittedPokemon.pokemonName = request.body.pokemonName;
        submittedPokemon.pokemonImage = request.file;
        if (request.file) { //otherwise an undefined reading path error will occur 
            submittedPokemon.pokemonImage = request.file.path;
        }
        submittedPokemon.save()
            .then(submittedPokemonData => {
                // console.log("This is the .then of the create Pokemon function in the controller saving the data:", submittedPokemonData);
                response.json(submittedPokemonData)
            })
            .catch(errors => {
                // console.log("This is the .catch of the create Pokemon function in the controller, meaning saving the data errored:", errors);
                response.json(errors)
            })     
}

const displayAllPokemon = (request, response) => {
    Pokemon.find() //this is doing a search of the database model Pokemon
    .then(allPokemonData => {
        // console.log("This is the .then of display all Pokemon function in the controller that shows all the data in the database model:", allPokemonData)
        response.json(allPokemonData)
    })
    .catch(errors => {
        // console.log("Errors", errors)
        response.json(errors)
    })
}

const specificPokemon = (request, response) => {
    // console.log("This console log is from the specific pokemon function in the controller.");
    Pokemon.findOne({_id: request.params.id})   //this is doing a search within the database model titled, Pokemon
    .then(specificPokemonData => {
        // console.log("This is the .then of specific Pokemon function in the controller that retrieves the Pokemon just selected by the user from the database model:", specificPokemonData)
        response.json(specificPokemonData)
    })
    .catch(errors => {
        // console.log("Errors", errors)
        response.json(errors)
    })
}

const updatePokemon = (request, response) => {
    console.log("This console log is from the update pokemon function in the controller.");
    console.log("Response:", request.body);
    Pokemon.findOne({_id: request.params.id}) //this is doing a search of the database model Pokemon
    .then(updateSpecificPokemonData => {
        console.log("The data to be updated:", updateSpecificPokemonData, "Pokemon Name:", request.body.pokemonName);
        updateSpecificPokemonData.pokemonName = request.body.pokemonName;
        console.log("Updated Pokemon Name:", updateSpecificPokemonData.pokemonName);
        if (request.file) { //otherwise an undefined reading path error will occur
            updateSpecificPokemonData.pokemonImage = request.file.path;
            console.log("Updated Pokemon Image:", updateSpecificPokemonData.pokemonImage);

        }
        updateSpecificPokemonData.save() 
            .then(updateSpecificPokemonData => { 
                console.log("The saved updated data:", updateSpecificPokemonData)
                response.json(updateSpecificPokemonData)
            })
            .catch(errors => { 
                console.log("errors", errors)
                response.json(errors)
            })
    })
    .catch(errors => {
        console.log("errors", errors)
        response.json(errors)
    })
}

const deletePokemon = (request, response) => {
    console.log("This console log is from the delete pokemon function in the controller.");
    Pokemon.findOne({_id: request.params.id})
    .then(deleteSpecificPokemonData => {
        deleteSpecificPokemonData.deleteOne()
        .then(pokemonData => {
            console.log("Pokemon Data being deleted:", pokemonData)
            response.json(pokemonData)
        })
        .catch(errors => { 
            console.log("errors", errors)
            response.json(errors)
        })
    })
    .catch(errors => {
        console.log("errors", errors)
        response.json(errors)
    })
}


module.exports = {createPokemon, displayAllPokemon, specificPokemon, updatePokemon, deletePokemon} 
