import React, { useState, useEffect } from 'react'

import axios from '../../axios-instances/axios-lista'
import { connect } from 'react-redux'

import ListInstance from '../../components/ListInstance/ListInstance'
import Hitbox from '../../components/Hitbox/Hitbox'

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

import classes from './Listas.module.sass'

const Listas = (props) => {
    const [listas, setListas] = useState([])

    const [update, setUpdate] = useState(false)

    useEffect(() => {
        const storedToken = JSON.parse(localStorage.getItem('token'))
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + storedToken
        axios.get('listas')
            .then(res => {
                console.log('[RES]', res)
                setListas(res.data)
                if(listas.length === 0){
                    console.log('NADA de primeras')
                    props.setPopup({
                        display: true,
                        type: 'loading',
                        text: 'touch at the bottom to add new list'
                    })
                }
            })
            .catch(err => console.log('[FIRST_ERR]', err))
    }, [update])

    useEffect (() => {
        if(listas.length === 0){
            console.log('NADA')
            props.setPopup({
                display: true,
                type: 'loading',
                text: 'touch at the bottom to add new list'
            })
        } else {
            props.setPopup({
                display: false
            })
        }

    }, [props, listas])


    const instances = listas.map( lista => (
        <ListInstance name={lista.name} key={lista._id} listaId={lista._id}/>
    ))

    const handleSubmit = (parsed) => {
        if (parsed !== null){
            axios.post(`postlista`, {name: parsed})
                .then(res => {
                    console.log(res)
                    setListas([...listas, res.data.data])
                })
                .catch(err => console.log(err))
        }
    }


    return (
        <>
            <div className={classes.itemsContainer}>
                {instances}
            </div>
            <Hitbox
                type="lista"
                submit={(parsed) => handleSubmit(parsed)}
                goBack={props.history.goBack}
            />
        </>

    )
}
const mapActions = (dispatch) => {
    return{
        setPopup: (data) => dispatch({type: 'SET_POPUP',data: data})
        //setPopup: (popData) => dispatch({type: 'SET_POPUP', popData: popData})
    }
}
export default connect(null, mapActions)(withErrorHandler(Listas, axios))
