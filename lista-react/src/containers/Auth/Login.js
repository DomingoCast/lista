import React, { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'
import axios from '../../axios-instances/axios-auth'
import { connect, dispatch } from 'react-redux'

import Button from '../../components/Button/Button'
import Input from '../../components/Input/Input'
import Popup from '../../components/Popup/Popup'

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

import classes from './Auth.module.sass'

const Login = (props) => {
    const [update, setUpdate] = useState(false)
    const [popupDisplay, setPDisplay] = useState(false)
    const [popupText, setPText] = useState(null)

    useEffect(() => {
        console.log('wasap')
        //window.scrollTo(0,window.innerHeight)
        //window.scrollTo(0,0)
        //window.scrollTo(0,window.innerHeight)
        //document.querySelector('#loginContainer').requestFullscreen()
    })

    const handleSubmit = async () => {
        const username = document.getElementById('username').value
        const password = document.getElementById('password').value
        try {
            let res= await axios.post('login', {
                username: username,
                password: password
            })
            if (!res.data.token){                  //me he estresado y ya no lo voy a hacer con errores
                console.log(res.data.msg)
                setPText(res.data.msg)
                setPDisplay(true)
                console.log(popupDisplay)
                setTimeout(() => {setPDisplay(false)}, 5000)
            } else {

                if(document.fullscreenElement !== null){
                    document.exitFullscreen()
                }
                console.log(res, res.response, res.error)
                props.setToken(res.data.token)
                localStorage.clear()
                localStorage.setItem('token', JSON.stringify(res.data.token))
                props.history.push('/listas')

            }
        } catch (error){
            console.log(error.response)
            console.log('emosido enganiado')
            setPText(error.response ? error.response.data.msg : error.message)
            setPDisplay(true)
            console.log(popupDisplay)
            setTimeout(() => {setPDisplay(false)}, 5000)
        }
            //.then(res => {

                //if(document.fullscreenElement !== null){
                    //document.exitFullscreen()
                //}
                //console.log(res, res.response, res.error)
                //props.setToken(res.data.token)
                //localStorage.clear()
                //localStorage.setItem('token', JSON.stringify(res.data.token))
                //props.history.push('/listas')
            //})
            //.catch(err => {
                //console.log('[hola]', err, err.response, err.data, err.msg)
            //})
    }
    console.log(popupDisplay)
    return(
        <>
        <Popup display={popupDisplay} type="error">{popupText}</Popup>
        <div id="loginContainer" className={classes.bigContainer}>
            <form className={classes.form}>
                <h1 className={classes.h1}>log in</h1>
                <div className={classes.inputContainer}>
                    <Input type="username"/>
                    <Input type="password"/>
                </div>
                <div className={classes.block3}>
                    <Button className={classes.button} type="main" text="log in" click={handleSubmit}/>
                    <Link className={classes.link} to='/singup'>sing up</Link>
                </div>
            </form>
        </div>
        </>
    )
}

//const mapState = (state) => ({
    //token: state.auth.idToken
//})

const mapActions = (dispatch) => {
    return{
        setToken: (token) => dispatch({type: 'SET_TOKEN',token: token})
    }
}

export default connect(null, mapActions)/*(withErrorHandler*/(Login/*, axios)*/)
