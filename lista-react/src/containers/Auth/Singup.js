import React from 'react'

import { Link } from 'react-router-dom'
import axios from '../../axios-instances/axios-auth'

import Button from '../../components/Button/Button'
import Input from '../../components/Input/Input'

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

import classes from './Auth.module.sass'

const Singup = (props) => {
    const handleSubmit = (e) => {
        e ? e.preventDefault() : console.log('no e')
        console.log('[SUBMIT]')
        const uname = document.getElementById('username').value
        const pw1 = document.getElementById('password1').value
        const pw2 = document.getElementById('password2').value
        console.log('[DATA]', uname, pw1, pw2)
        axios.post('postuser', {
            username: uname,
            password1: pw1,
            password2: pw2
        })
        .then(res => console.log(res))
        .catch(err => console.log(err))
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

export default withErrorHandler(Singup, axios)
