const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')

const listaRoutes = require('./routes/lista')
const authRoutes = require('./routes/auth')

app = express()

app.use(cors())

app.use(bodyParser.json()) // to be able to parse json data from req.body
app.use('/lista', listaRoutes)
app.use('/auth', authRoutes)

mongoose.connect('mongodb+srv://domingoAdmin:domingoAdmin36@cluster0.0aa3g.mongodb.net/lista?retryWrites=true&w=majority',{useUnifiedTopology: true, useNewUrlParser: true})
    .then(res => {
        //console.log('[DB_CONNECTED]', res)
        app.listen(8080)
    })
    .catch(err => console.log('[DB_ERROR]', err))

