import React, { useState, useEffect } from 'react'

import axios from '../../axios-instances/axios-lista'

import ListInstance from '../../components/ListInstance/ListInstance'
import Hitbox from '../../components/Hitbox/Hitbox'

import classes from './Listas.module.sass'

const Listas = (props) => {
    const [listas, setListas] = useState([])

    const [update, setUpdate] = useState(false)

    useEffect(() => {
        const storedToken = JSON.parse(localStorage.getItem('token'))
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + storedToken
        axios.get('listas')
            .then(res => {
                setListas(res.data)
            })
            .catch(err => console.log('[FIRST_ERR]', err))
        //axios.get(`http://192.168.1.12:8080/lista/listas`)
            //.then( res => {
                //console.log(res.data)
                //setListas(res.data)
            //})
            //.catch(err => console.log('[SECOND_ERR]', err))
    }, [update])

    const instances = listas.map( lista => (
        <ListInstance name={lista.name} key={lista._id} listaId={lista._id}/>
    ))

    const handleSubmit = (parsed) => {
        if (parsed !== null){
            axios.post(`postlista`, {name: parsed})
                .then(res => console.log(res))
                .catch(err => console.log(err))
        }
    }


    return (
        <div className={classes.bigContainer}>
        <div className={classes.itemsContainer}>
            {instances}
        </div>
        <Hitbox
            type="lista"
            submit={(parsed) => handleSubmit(parsed)}
            goBack={props.history.goBack}
        />
        </div>

    )
}

export default Listas
