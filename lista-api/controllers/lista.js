const ObjectId = require('mongodb').ObjectId

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

exports.getLista = (req, res, next) => {
    console.log(req.params.id)
    console.log(req.params.id)
    Lista
        .findById(req.params.id)
        .populate({
            path: 'orders',
            populate: {
                path: 'item',
                model: 'Ingredient'
            }
        })
        .then( lista => {
            console.log('[IDS]', ObjectId(req.userId), lista.users)
            if(lista.users.includes(ObjectId(req.userId))){
                console.log('[RESPONSE this]', lista)
                res.status(200).json(lista)

            } else {
                const err = new Error('no estas en la lista')
                err.statusCode = 401
                res.status(401).json('no estas en la lista')
                throw err
            }
        })
        .catch(err => console.log('[FETCH_ERR]', err))
}

exports.postToLista = (req, res, next) => {
    let ingredient

    Ingredient.findOne({name: req.body.name}, (err, algo) => {     //checkear si ya existe
        console.log('[REQ_BODY]', req.body)
        if (algo === null){
            console.log('crea nuevo')
            ingredient = new Ingredient({
                name: req.body.name
            })
            ingredient
                .save()
                    .then(res => console.log('[INGREDIENT_SAVED]', res))
                    .catch(err => console.log('[INGREDIENT_ERR]', err))
        } else {
            console.log('no crea nuevo')
            ingredient = algo
        }
    }).then(() =>


    Lista.findById(req.params.listId, (err, cat) => {
        cat.orders = [...cat.orders, {
            item: ingredient._id,
            q: req.body.q
        }]
        cat.save( )
            .then( suc => res.status(200).json(suc) )
            .catch( err => {
                console.log(cat)
                console.log(err)
            })
    }))
}

exports.getListas = (req, res, next) => {
    Lista.find({"users": { $in: req.userId }}).then(response => {
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

exports.putOrder = (req, res, next) => {
    Lista.findById(req.params.listId)
        .then(lista => {
            const upIndex = lista.orders.findIndex(order => order._id.toString() === req.body.order._id)
            console.log('[ID]', req.body.order._id, req.body.order)
            console.log('[INDEX]', upIndex)
            lista.orders[upIndex] = req.body.order
            lista.save()
            res.status(200).json(lista)
        })
}

exports.deleteOrder = (req, res, next) => {
    console.log('[DELETIN]')
    Lista.findById(req.params.listId)
        .then(lista => {
            const upIndex = lista.orders.findIndex(order => order._id.toString() === req.params.orderId)
            console.log('[INDEX]', upIndex, req.params.orderId)
            const newLista = [...lista.orders]
            delete newLista[upIndex]
            lista.orders = newLista
            console.log('[ORDERS]', lista.orders)
            lista.save()
            res.status(200).json(lista)
        })
}
