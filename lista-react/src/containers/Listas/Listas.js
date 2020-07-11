import React, { useState, useEffect } from 'react'

import axios from '../../axios-instances/axios-lista'

//import ListInstance from '../../components/ListInstance/ListInstance'
import ListInstance from '../../components/ListInstance/ListInstance'

import classes from './Listas.module.sass'

const Listas = (props) => {
    const [listas, setListas] = useState([])

    const [update, setUpdate] = useState(false)

    useEffect(() => {
        console.log('smth?')
        axios.get('listas')
            .then(res => {
                setListas(res.data)
            })
            .catch(err => console.log('[FIRST_ERR]', err))
        axios.get(`http://192.168.1.12:8080/lista/listas`)
            .then( res => {
                console.log(res.data)
                setListas(res.data)
            })
            .catch(err => console.log('[SECOND_ERR]', err))
    }, [update])

    const instances = listas.map( lista => (
        <ListInstance name={lista.name} key={lista._id} listaId={lista._id}/>
    ))

    return (
        <div className={classes.itemsContainer}>
            {instances}
        </div>

    )
}

export default Listas
