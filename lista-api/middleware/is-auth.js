const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]
    console.log('[TOKEN]', token)

    let decoded

    try{
        decoded = jwt.verify(token, 'esto es una prueba, mejor no pongo mi contra se!~_na de verdad, que no quiero k m .1!#$hakdxxeen')
    } catch(err){
        err.statusCode = 500
        throw err
    }
    console.log(decoded)

    if(!decoded){
        console.log('fallaste')
        const error = new Error('not authenticated')
        error.statusCode = 401
        throw error
        return
    }
    req.userId = decoded.userId
    next()
}
