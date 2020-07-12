import React, { useState, useEffect } from 'react'

import { connect, dispatch } from 'react-redux'

import axios from '../../axios-instances/axios-lista'

import classes from './Lista.module.sass'

import Item from '../../components/Item/Item'
import Hitbox from '../../components/Hitbox/Hitbox'


const Lista = (props) => {
    const [items, setItems] = useState([])
    const [listName, setListName] = useState("")
    const [listId, setListId] = useState("")

    const [update, setUpdate] = useState(0)

    useEffect(() => {
        //console.log(props)
        const storedToken = JSON.parse(localStorage.getItem('token'))
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + storedToken
        axios.get(`lista/${props.match.params.id}`)
            .then( res => {
                //console.log('[RESPONSE]', res.data)
                setListName(res.data.name)
                setListId(res.data._id)
                setItems(res.data.orders)
            })
            .catch( err => {
                console.log('[FIRST_ERR]', err)
            })
        console.log('algo?')
        }, [update, props])

    const handleSubmit = (parsed) => {

        if (parsed !== null){
            setItems([...items,{item:{name: parsed[0]}, q: parsed[1]}])
            axios.post(`posttolista/${listId}`, {name: parsed[0] ,q: parsed[1]})
                //.then(res => console.log(res))
                .catch(err => console.log(err))

        }
    }

    const updateOrder = (newOrder) => {
        axios.put(`putorder/${listId}`, {order: newOrder})
            .then(res => console.log('[UP ORDER]', res.data.orders))
            .catch(err => console.log(err))
    }
    const deleteOrder = (orderId) => {
        console.log('[DELETING]', orderId)
        axios.delete(`deleteorder/${listId}/${orderId}`)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }


    const increase = (id, index, q) => {
        //let laQ

        const newItems = [...items]
        const newOrder = {...newItems[index]}


        //if(props.currQ === "null"){
            //console.log('[NULL]')
            //laQ = newOrder.q + 1
            //props.setQ(laQ)
            //setUpdate(update * (-1))
        //} else {
            //console.log('[NOT NULL]')
            //const lred = props.currQ
            //laQ = props.currQ + 1
            //props.setQ(laQ)
            //console.log('[REDUX]', lred, laQ, props.currQ)
        //}

        //newOrder.q = laQ
        newOrder.q = q + 1

        console.log('[INCRESE LISTA]', props.currQ)
        newItems[index] = newOrder
        setItems(newItems)

        if(newOrder.q > 0){
            newOrder.status = null
        }

        updateOrder(newOrder)

        return q + 1
    }

    const decrease = (id, index, q) => {
        const newItems = [...items]
        const newOrder = {...newItems[index]}

        newOrder.q =  q - 1
        console.log('[NEW ORDER]', newOrder)
        if (newOrder.q === 0){
            newOrder.status = 'bought'
            //return
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
        return q - 1
    }



    const listItems = items.map((item, index) => (
        <Item name={item.item ? item.item.name : null}
                key={item._id}
                lid={item._id}
                q={item.q}
                status={item.status}
                increase={ (q) => increase(item._id, index, q) }
                decrease={ (q) => decrease(item._id, index, q)}
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
            <Hitbox
                type="order"
                submit={(parsed) => handleSubmit(parsed)}
                goBack={props.history.goBack}
            />
        </div>
    )
}

const mapState = (state) => ({
    currQ: state.currQ
})

const mapActions = (dispatch) => ({
    setQ: (currQ) => dispatch({type: 'SET_Q', currQ: currQ})

})


export default connect(mapState, mapActions)(Lista)
