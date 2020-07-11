const mongoose = require('mongoose')
const Schema = mongoose.Schema

const listaSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    orders: [
        {
            item: {type: Schema.Types.ObjectId, required: true, ref: 'Ingredient'},
            q: {type: Number, required: true},
            status: {type: String, required: false}
        }
    ],
    users: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: false
        }
    ]

})

module.exports = mongoose.model('Lista', listaSchema)
