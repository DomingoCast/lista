const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    listas: [
        {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Lista'
        }
    ]
})

module.exports = mongoose.model('User', userSchema)
