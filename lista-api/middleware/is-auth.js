const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]
    console.log('[TOKEN]', token)

    let decoded

    try{
        decoded = jwt.verify(token, 'esto es una prueba, mejor no pongo mi contra se!~_na de verdad, que no quiero k m .1!#$hakdxxeen')
    } catch(err){
        //console.log('[CATCH]', err, typeof(err), Object.keys(err), err.message, err.name)
        //err.statusCode = 500
        //throw err
        if (err.message === 'jwt malformed'){
            res.status(401).json({msg: 'not authenticated'})
        } else if ( err.message === 'jwt expired' )
            res.status(401).json({msg: 'session expired'})
        else {
            res.status(401).json({msg: 'unathorised'})
        }
        return

    }
    console.log(decoded)

    if(!decoded){
        console.log('fallaste')
        const error = new Error('session expired')
        error.statusCode = 401
        res.status(401).json({msg: 'session expired'})
        //throw error
        return
    }
    req.userId = decoded.userId
    next()
}
