const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ingredientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    store: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: false
    },
    category: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('Ingredient', ingredientSchema)
//
//module.exports = ingredientSchema
