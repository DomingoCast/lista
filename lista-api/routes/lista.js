const express = require('express')

const router = express.Router()

const listaController = require('../controllers/lista')

router.get('/ingredients', listaController.getIngredients)

module.exports = router
