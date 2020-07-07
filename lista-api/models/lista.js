const mongoose = require('mongoose')
const Schema = mongoose.Schema

const listaSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    orders: [
        {
            itemId:{type: Schema.Types.ObjectId, required: true},
            q: {type: Number, required: true}
        }
    ]
})

module.exports = mongoose.model('Lista', listaSchema)
