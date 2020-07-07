const express = require('express')
const bodyParser = require('body-parser')

const listaRoutes = require('./routes/lista')


app = express()

app.use(bodyParser.json()) // to be able to parse json data from req.body
app.use('/lista', listaRoutes)

app.listen(8080)
