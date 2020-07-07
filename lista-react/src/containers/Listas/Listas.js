import React, { useState, useEffect } from 'react'

import axios from '../../axios-lista'

//import ListInstance from '../../components/ListInstance/ListInstance'
import ListInstance from '../../components/ListInstance/ListInstance'

import classes from './Listas.module.sass'

const Listas = (props) => {
    const [listas, setListas] = useState(null)

    const [update, setUpdate] = useState(false)

    useEffect(() => {
        console.log('smth?')
        axios.get('listas')
            .then(res => {
                setListas(res.data)
            })
            .catch(err => console.log(err))
    }, [update])

    const instances = listas.map( lista => (
        <ListInstance name={lista.name} listaId={lista._id}/>
    ))

    return (
        <div>
            {instances}
        </div>

    )
}

export default Listas
