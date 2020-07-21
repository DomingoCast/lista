import React, { useState, useEffect } from 'react'

import { connect, dispatch } from 'react-redux'
import openSocket from 'socket.io-client'

import axios from '../../axios-instances/axios-lista'

import classes from './Lista.module.sass'

import Item from '../../components/Item/Item'
import Hitbox from '../../components/Hitbox/Hitbox'

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

import realVh from '../../util/real-vh'
import dev from '../../util/dev'


const Lista = (props) => {
    const [items, setItems] = useState([])
    const [listName, setListName] = useState("")
    const [listId, setListId] = useState("")
    const [scroll, setScroll] = useState('null')
    const [sorting, setSorting] = useState('time')

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
                console.log('[ITEMS]', res.data.orders, items)
            })
            .catch( err => {
                console.log('[FIRST_ERR]', err)
            })
        //console.log('algo?')

        }, [update])

    useEffect(() => {
        const socket = openSocket(dev.url)
        socket.on('orders', data => {
            if(data.action === 'post'){
                console.log('[PUT SOCKET]', data.order)
                addOrderLocal(data.order)
            }
        })
    })

    useEffect(() => {
        handleScroll()
    }, [items])

    const addOrderLocal = (order) => {
        console.log('[ADD]', items)
        if (order !== null && items.length !== 0){
            setItems([...items,{item:{...order.item}, q:order.q}])
        }
    }

    const handleSubmit = (order) => { //hacer que anyada a ui de la respuesta del post, si no no funciona el item
        //console.log('[order]', order, items)

        if (order !== null){
            //setItems([...items,{item:{...order.item}, q:order.q}])
            axios.post(`posttolista/${listId}`, {order: order})
                //.then(res => console.log(res))
                .catch(err => console.log(err))

        }
    }

    const updateOrder = (newOrder) => {
        axios.put(`putorder/${listId}`, {order: newOrder})
            //.then(res => console.log('[UP ORDER]', res.data.orders))
            .catch(err => console.log(err))
    }

    const deleteOrder = (orderId) => {
        //console.log('[DELETING]', orderId)
        axios.delete(`deleteorder/${listId}/${orderId}`)
            .then(res => {
                //console.log('DELETE', res)
            })
            .catch(err => console.log('DELETE', err))

    }


    const increase = (id, index, q) => {
        //let laQ

        const newItems = [...items]
        const newOrder = {...newItems[index]}
        newOrder.q = q + 1

        //console.log('[INCRESE LISTA]', props.currQ)
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
        //console.log('[NEW ORDER]', newOrder)
        if (newOrder.q === 0){
            newOrder.status = 'bought'
        } else if(newOrder.q === -1){
            newOrder.status = 'borrado'
            //console.log('spaghetti', id)
            newItems[index] = newOrder
            setItems(newItems)
            deleteOrder(id)
            return
        }

        newItems[index] = newOrder
        setItems(newItems)
        //console.log('[decreasing]')

        updateOrder(newOrder)
        return q - 1
    }

    const sortItems = () => {
        console.log('[ITEMS 2]', items)
        if (sorting === 'time'){
            console.log('IN TIME')
            return items

        } else if (sorting === 'category'){
            //console.log('category')
            const categories = []
            let ordered = {}

            for(let order of items){
                if(!categories.includes(order.item.category)){
                    ordered[order.item.category] = []
                }
                ordered[order.item.category].push(order)
            }
            //console.log('[SORTED]', ordered)
            return ordered
        }
    }





    const handleScroll = () => {

        const element = document.querySelector("."+classes.itemsContainer)

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

    const listItemsConstructor = () => {
        let listItems
        let finalList = []
        const ordered = sortItems()

        if(sorting !== 'time'){
            for(let cat in ordered){

                let listaza = ordered[cat].map((item, index) => item ? (
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
                //console.log('[IN]', cat, ordered[cat], listaza)

                listItems = finalList.concat(listaza)
            }
            return listItems

        } else {
            console.log('[IN TIME 2]')
            listItems = items.map((item, index) => item ? (
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
            return listItems
        }

    }

    //let listItems = items.map((item, index) => item ? (
        //<Item name={item.item ? item.item.name : null}
                    //key={item._id}
                    //lid={item._id}
                    //item={item.item ? item.item : {store: null, price: null, category: null}}
                    //q={item.q}
                    //status={item.status}
                    //increase={ (q) => increase(item._id, index, q) }
                    //decrease={ (q) => decrease(item._id, index, q)}
                   ////setQ={ () => setQ(index) }
            ///>
        //): null)

    return(
        <>
            <h1 className={classes.h1}>{listName}</h1>
            <div id={listId} onScroll={handleScroll} className={classes.itemsContainer + ' ' + scroll}>
                {listItemsConstructor()}
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
