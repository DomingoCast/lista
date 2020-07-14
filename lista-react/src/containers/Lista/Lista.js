import React, { useState, useEffect } from 'react'

import { connect, dispatch } from 'react-redux'

import axios from '../../axios-instances/axios-lista'

import classes from './Lista.module.sass'

import Item from '../../components/Item/Item'
import Hitbox from '../../components/Hitbox/Hitbox'

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

import realVh from '../../util/real-vh'


const Lista = (props) => {
    const [items, setItems] = useState([])
    const [listName, setListName] = useState("")
    const [listId, setListId] = useState("")
    const [scroll, setScroll] = useState('null')

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

    useEffect(() => {
        handleScroll()

        //console.log('[ITEMS]', items, items.length)
        //let c = true
        //for(let item of items){
            //console.log(item)
            //if(item.q !== -1){
                //c = false
                //break
            //}

        //}

        //if(items.length === 0 || c){
            //console.log('NADA')
            //props.setPopup({
               //display: true,
                //type: 'loading',
                //text: 'touch at the bottom to add a new order'
            //})
        //} else {
            //console.log('[WAIT WHAAT?]')
            //props.setPopup({
                //display: false
            //})
        //}

    }, [items])

    const handleSubmit = (order) => { //hacer que anyada a ui de la respuesta del post, si no no funciona el item
        console.log('[order]', order, items)

        if (order !== null){
            setItems([...items,{item:{...order.item}, q:order.q}])
            axios.post(`posttolista/${listId}`, {order: order})
                .then(res => console.log(res))
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
            .then(res => {
                console.log('DELETE', res)
            })
            .catch(err => console.log('DELETE', err))

    }


    const increase = (id, index, q) => {
        //let laQ

        const newItems = [...items]
        const newOrder = {...newItems[index]}
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
            //borrar
            //delete newItems[index]
            //newItems.splice(index, 1)

            newItems[index] = newOrder
            setItems(newItems)
            deleteOrder(id)
            return
        }

        newItems[index] = newOrder
        setItems(newItems)
        console.log('[decreasing]')

        updateOrder(newOrder)
        return q - 1
    }



    let listItems = items.map((item, index) => item ? (
        <Item name={item.item ? item.item.name : null}
                key={item._id}
                lid={item._id}
                item={item.item ? item.item : {store: null, price: null, category: null}}
                q={item.q}
                status={item.status}
                increase={ (q) => increase(item._id, index, q) }
                decrease={ (q) => decrease(item._id, index, q)}
               //setQ={ () => setQ(index) }
        />
    ): null)

    const handleScroll = () => {
        console.log('[POR QE PASAS SE IIIIII]')
        //const element = document.getElementById(listId.toString())
        const element = document.querySelector("."+classes.itemsContainer)
        console.log('[HOLLLLLLLLLLLA]', element.scrollHeight, element.clientHeight)
        //let scrollClass
        //console.log('[heights]', element.scrollHeight - element.scrollTop, element.clientHeight)
        if (element.scrollHeight === element.clientHeight){
            if(scroll !== null){
                setScroll(null)
            }
        }else if(element.scrollTop === 0){
            if(scroll !== classes.scrollTop){
                setScroll(classes.scrollTop)
            }
        }else if(Math.round(element.scrollHeight - element.scrollTop) === element.clientHeight){
            if(scroll !== classes.scrollBottom){
                setScroll(classes.scrollBottom)
            }
        }else if(element.clientHeight ){
            if(scroll !== classes.scrollMiddle){
                setScroll(classes.scrollMiddle)
            }
        }
    }

    realVh()

    //{/* onFocus={handleDBL} onBlur={handleDBL} */}
    return(
        <>
            <h1 className={classes.h1}>{listName}</h1>
            <div id={listId} onScroll={handleScroll} className={classes.itemsContainer + ' ' + scroll}>
                {listItems}
            </div>
            <Hitbox
                type="order"
                submit={(order) => handleSubmit(order)}
                goBack={props.history.goBack}
            />
        </>
    )
}

const mapState = (state) => ({
    currQ: state.currQ
})

const mapActions = (dispatch) => ({
    setQ: (currQ) => dispatch({type: 'SET_Q', currQ: currQ})

})


export default connect(mapState, mapActions)(withErrorHandler(Lista, axios))
