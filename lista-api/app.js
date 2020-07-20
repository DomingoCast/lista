const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')

//const io = require('./socket')

//production
const helmet = require('helmet')
const compression = require('compression')

const listaRoutes = require('./routes/lista')
const authRoutes = require('./routes/auth')

app = express()

app.use(helmet())
app.use(cors())

app.use(bodyParser.json()) // to be able to parse json data from req.body
app.use('/lista', listaRoutes)
app.use('/auth', authRoutes)

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PW}@cluster0.0aa3g.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,{useUnifiedTopology: true, useNewUrlParser: true})
    .then(res => {
        //console.log('[DB_CONNECTED]', res)
        const server = app.listen(process.env.PORT || 8080)
        const io = require('./socket').init(server)
        io.on('connection', socket => {
            console.log('[CLIENT CONNECTED]')
        })
    })
    .catch(err => console.log('[DB_ERROR]', err))

