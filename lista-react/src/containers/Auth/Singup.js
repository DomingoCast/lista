import React from 'react'

import { Link } from 'react-router-dom'
import axios from '../../axios-instances/axios-auth'
import { connect } from 'react-redux'

import Button from '../../components/Button/Button'
import Input from '../../components/Input/Input'

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

import classes from './Auth.module.sass'

const Singup = (props) => {
    const handleSubmit = async (e) => {
        e ? e.preventDefault() : console.log('no e')
        console.log('[SUBMIT]')
        const username = document.getElementById('username').value
        const password1 = document.getElementById('password1').value
        const password2 = document.getElementById('password2').value
        try {
            let singRes = await axios.post('postuser', {
                username: username,
                password1: password1,
                password2: password2
            })
            console.log(singRes)

            let logRes = await axios.post('login', {
                username: username,
                password: password1
            })
            props.setToken(logRes.data.token)
            localStorage.clear()
            localStorage.setItem('token', JSON.stringify(logRes.data.token))
            props.history.push('/listas')
            console.log(logRes)
        }
        catch (error){
            console.log('[SINGUP ERROR]', error)
        }
    }
    return(
        <>
            <div className={classes.loginContainer}>
                <form onSubmit={handleSubmit} className={classes.form}>
                    <h1 className={classes.h1}>sing up</h1>
                    <div className={classes.inputContainer}>
                        <Input type="username"/>
                        <Input type="doublePassword"/>
                        <input className={classes.submitHidden} type="submit"/>
                    </div>
                    <div className={classes.block3}>
                        <Button className={classes.button} type="main" text="sing up" click={handleSubmit}/>
                        <Link className={classes.link} to='/login'>log in</Link>
                    </div>
                </form>
            </div>
        </>
    )
}

const mapActions = (dispatch) => {
    return{
        setToken: (token) => dispatch({type: 'SET_TOKEN',token: token})
    }
}

export default connect(null, mapActions)(withErrorHandler(Singup, axios))
