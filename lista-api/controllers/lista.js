const Ingredient = require('../models/ingredient')
const Lista = require('../models/lista')

exports.getIngredients = (req, res, next) => {
    Ingredient.find().then(response => {
        console.log('[RESPONSE]', response)
        res.status(200).json(response)
    })
    .catch(err => console.log('[FETCH_ERR]', err))
}

exports.postIngredient = (req, res, next) => {
    console.log('[BODY]',req.body)

    const ingredient = new Ingredient({
        name: req.body.name
    })
    ingredient
        .save()
        .then(res => console.log('[INGREDIENT_SAVED]', res))
        .catch(err => console.log('[INGREDIENT_ERR]', err))

    res.status(201).json({
        message: "succesfully added post",
        posts: [{id: new Date().toISOString(), name: req.body.name}]
    })
}

exports.getListas = (req, res, next) => {
    Lista.find().then(response => {
        console.log('[RESPONSE]', response)
        res.status(200).json(response)
    })
    .catch(err => console.log('[FETCH_ERR]', err))
}

exports.postLista = (req, res, next) => {
    const lista = new Ingredient({
        name: req.body.name,
        lista: []
    })
    lista
        .save()
        .then(res => console.log('[lista_SAVED]', res))
        .catch(err => console.log('[lista_ERR]', err))
    res.status(201).json({
        message: "succesfully added post",
        data: lista
    })
}
