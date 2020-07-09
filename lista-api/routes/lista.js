const express = require('express')

const router = express.Router()

const listaController = require('../controllers/lista')

router.get('/ingredients', listaController.getIngredients)
router.post('/newingredient', listaController.postIngredient)

router.get('/lista/:id', listaController.getLista)
router.post('/posttolista/:listId', listaController.postToLista)
router.get('/listas', listaController.getListas)
router.post('/newLista', listaController.postLista)
router.put('/putorder/:listId/:index', listaController.putOrder)

module.exports = router
