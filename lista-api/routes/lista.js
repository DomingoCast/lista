const express = require('express')

const router = express.Router()

const listaController = require('../controllers/lista')

router.get('/ingredients', listaController.getIngredients)
router.post('/newingredient', listaController.postIngredient)

router.get('/listas', listaController.getListas)
router.post('/newLista', listaController.postLista)

module.exports = router
