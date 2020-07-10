import React, { useState, useEffect } from 'react'

import axios from '../../axios-instances/axios-lista'

import classes from './Lista.module.sass'

import Item from '../../components/Item/Item'

const Lista = (props) => {
    const [items, setItems] = useState([])
    const [listName, setListName] = useState("")
    const [listId, setListId] = useState("")

    const [focused, setFocus] = useState(false)
    const [update, setUpdate] = useState(false)

    useEffect(() => {
        console.log(props)
        axios.get(`lista`)
            .then( res => {
                console.log(res.data)
                setListName(res.data.name)
                setListId(res.data._id)
                setItems(res.data.orders)
            })
            .catch( err => console.log('[ERR]', err) )
            }, [update]
    )


    const handleDBL = () => {
        console.log('[FOCUS]: ',focused)
        const linput = document.querySelector('#searchInput')
        if(focused){
            setFocus(false)
            linput.blur()
        }else {
            setFocus(true)
            linput.focus()
        }
    }

    const parseInput = input => {
        console.log('INPUT', input)
        const divided = input.split(' ')
        console.log('DIVIDED', divided)
        if(!input){
            return null
        }else if(divided[divided.length - 1][0] === 'x' && parseInt(divided[divided.length - 1].slice(1))){
            console.log('aqui he llegado', divided.slice(divided.length - 1).join(''), parseInt(divided[divided.length - 1].slice(1)))
            const result =[divided.slice(0, divided.length - 1).join(''), parseInt(divided[divided.length - 1].slice(1))]
            console.log('[RESULT]', result)
            return result
        } else {
            return [input, 1]
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.defaults.baseURL = ''
        const value = document.querySelector('#searchInput').value

        const parsed = parseInput(value) // parsed[0] = name, parsed[1] = q

        if (parsed !== null){
            setItems([...items,{item:{name: parsed[0]}, q: parsed[1]}])
            axios.post(`http://localhost:8080/lista/addingredient`, {name: parsed[0] ,q: parsed[1]})
                .then(res => console.log(res))
                .catch(err => console.log(err))

        }
    }

    const listItems = items.map(item => (
        <Item name={item.item ? item.item.name : null} q={item.q} status={item.status}/>
    ))

    //{/* onFocus={handleDBL} onBlur={handleDBL} */}
    return(
        <div className={classes.bigContainer}>
            <h1 className={classes.h1}>{listName}</h1>
            <div className={classes.itemsContainer}>
                {listItems}
            </div>
            <div onClick={handleDBL} className={classes.hitBox}>
                <div className={classes.suggestions}></div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        id="searchInput"
                        className={focused ? classes.focused : classes.unFocused}
                    />
                    <input className={classes.submitBtn}type="submit"/>
                </form>
            </div>
        </div>
    )
}

export default Lista
