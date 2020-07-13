const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

const valSingData = (username, password1, password2) => {
    console.log('validame esta')
    const re = /^[a-zA-Z]{2,10}$/
    if(!re.test(username)){
        return('invalid username (max 10characters)')
    }else if(password1 !== password2){
        return 'passwords don\'t match'
    } else{
        return 'valid'
    }
}

exports.login = (req, res, next) => {
    console.log('[HEADERS]', req.headers)
    const username = req.body.username
    const password = req.body.password
    User.findOne({username: username})
        .then(user => {
            if(!user){
                console.log('[USER NOT FOUND]')
                //res.send({msg: 'user not found'})
                res.status(400).json({msg: 'user not found'})
            } else {
                console.log('[MATCHED]')
                bcrypt.compare(password, user.password)
                    .then( s => {
                        if(s){
                            const token = jwt.sign({
                                username: user.username,
                                userId: user._id.toString()
                            }, 'esto es una prueba, mejor no pongo mi contra se!~_na de verdad, que no quiero k m .1!#$hakdxxeen',
                                {expiresIn: '1h'})
                            res.status(200).json({token: token})
                        } else {
                            console.log('[WRONG PASSWORD]')
                            res.status(400).json({msg: 'wrong password'}) //400 porque es bad request
                        }
                    })
                    .catch(err => {
                        res.status(500)
                    })
            }
        })
        .catch(err => res.status(500).json(err))
}

exports.postUser = (req, res, next) => {
    //check if username is used
    const username = req.body.username
    const password1 = req.body.password1
    const password2 = req.body.password2
    validation = valSingData(username, password1, password2)
    if(validation !== 'valid'){
        res.status(400).json({msg: validation}) //400 porque es bad request}
    } else {
        User.findOne({username: username})
            .then( user => {
                if(!user){
                    bcrypt.hash(password1, 12)
                        .then(hashedPw => {
                            //console.log(hashedPw)
                            newUser = new User()
                            newUser.username = username
                            newUser.password = hashedPw
                            newUser.save()
                                .then(response => res.status(201).json(response))
                                .catch(err => res.status(500).json(err))
                        })
                        .catch(err => res.status(500))//.json({msg: 'la contra, que no tira'}))
                } else {
                    res.status(400).json({msg: 'user already exists'})
                }
            })
            .catch(err => res.status(500))//.json(msg: 'no encuentra esto'}))

    }
    //create user and save
}
