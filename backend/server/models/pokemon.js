const mongoose = require('mongoose');

const pokemonSchema = new mongoose.Schema({
    pokemonName: {type: String, required: [true, "Please type the name of the Pokemon"]},
    pokemonImage: {type: Object, required: [true, "Please upload an image of the Pokemon"]},
    // pokemonImage: {
    //     type: String,
    //     public_id: {
    //         type: String,
    //         required: false
    //     },
    //     url: {
    //         type: String,
    //         required: false
    //     }
    // },

}, {timestamps: true})

const Pokemon = mongoose.model('Pokemon', pokemonSchema)

module.exports = {
    Pokemon: Pokemon,
    pokemonSchema: pokemonSchema
}