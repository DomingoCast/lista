const express = require('express')

const router = express.Router()

const listaController = require('../controllers/lista')
const isAuth = require('../middleware/is-auth')

router.get('/ingredients', listaController.getIngredients)
router.post('/newingredient', listaController.postIngredient)

router.get('/lista/:id', isAuth, listaController.getLista)
router.post('/posttolista/:listId', listaController.postToLista)
router.get('/listas', isAuth,  listaController.getListas)
router.post('/newLista', listaController.postLista)
router.put('/putorder/:listId/', listaController.putOrder)
router.delete('/deleteorder/:listId/:orderId', listaController.deleteOrder)

module.exports = router
