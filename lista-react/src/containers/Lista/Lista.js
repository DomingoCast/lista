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
        axios.get(`lista/${props.match.params.id}`)
            .then( res => {
                console.log('[RESPONSE]', res.data)
                setListName(res.data.name)
                setListId(res.data._id)
                setItems(res.data.orders)
            })
            .catch( err => {
                console.log('[FIRST_ERR]', err)
            })
            //axios.get(`http://192.168.1.12:8080/lista/lista/${props.match.params.id}`)
            //.then( res => {
                //console.log(res.data)
                //setListName(res.data.name)
                //setListId(res.data._id)
                //setItems(res.data.orders)
            //})
            //.catch(err => console.log('[SECOND_ERR]', err))
        }, [update])


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
            const result =[divided.slice(0, divided.length - 1).join(' '), parseInt(divided[divided.length - 1].slice(1))]
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
            axios.post(`posttolista/${listId}`, {name: parsed[0] ,q: parsed[1]})
                .then(res => console.log(res))
                .catch(err => console.log(err))

        }
    }

    const updateOrder = (newOrder) => {
        axios.put(`putorder/${listId}`, {order: newOrder})
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }
    const deleteOrder = (orderId) => {
        console.log('[DELETING]', orderId)
        axios.delete(`deleteorder/${listId}/${orderId}`)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }


    const increase = (id, index) => {
        const newItems = [...items]
        const newOrder = {...newItems[index]}
        newOrder.q += 1
        newItems[index] = newOrder
        setItems(newItems)
        if(newOrder.q > 0){
            newOrder.status = null
        }
        updateOrder(index, newOrder)
    }

    const decrease = (id, index) => {
        const newItems = [...items]
        const newOrder = {...newItems[index]}
        newOrder.q -= 1
        console.log('[NEW ORDER]', newOrder)
        if (newOrder.q === 0){
            newOrder.status = 'bought'
        } else if(newOrder.q === -1){
            newOrder.status = 'borrado'
            console.log('spaghetti', id)
            deleteOrder(id)
            newItems[index] = newOrder
            setItems(newItems)
            return
        }

        newItems[index] = newOrder
        setItems(newItems)
        console.log('[decreasing]')

        updateOrder(newOrder)
    }



    const listItems = items.map((item, index) => (
        <Item name={item.item ? item.item.name : null}
                key={item._id}
                lid={item._id}
                q={item.q}
                status={item.status}
                increase={ () => increase(item._id, index) }
                decrease={ () => decrease(item._id, index) }
               //setQ={ () => setQ(index) }
        />
    ))

    //{/* onFocus={handleDBL} onBlur={handleDBL} */}
    return(
        <div className={classes.bigContainer}>
            <h1 className={classes.h1}>{listName}</h1>
            <div id={listId} className={classes.itemsContainer}>
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
