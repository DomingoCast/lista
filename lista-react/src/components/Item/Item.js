import React, { useState, useEffect } from 'react'
import classes from './Item.module.sass'

import { connect, dispatch } from 'react-redux'

const Item = (props) => {

    const [x, setX] = useState(null)
    const [transform, setTransform] = useState(0)
    const [cap, setCap] = useState(50)
    const [min, setMin] = useState(5)
    const [swipingClass, setSwipingClass] = useState(null)
    const [maxed, setMaxed] = useState(0) // 0 para no, 1 para maxed, 2 para maxed y ha aguantado
    const [tiempo, setTiempo] = useState(500)
    const [waiting, setWaiting] = useState(false)
    const [touch, setTouch] = useState(false)
    const [lwait, setLwait] = useState(null)
    //const [q, setQ] = useState(props.q)
    const [gotIn, setIn] = useState(false)
    const [tTimer, setTT] = useState(null)
    const [onMore, setOnMore] = useState(false)
    //const [touched, setTouched] = useState(null)


    //useEffect(() => {
        //console.log('macarrones', q)
        //if (q < 0){
        //}
    //}, [q, props])

    const increaseQ = (q) => {
        return props.increase(q)
    }

    const decreaseQ = (q) =>{
        console.log('[DECREASE]')
        return props.decrease(q)
    }

    const handleTS = () => {
        console.log('[TS ITEM]')
        let timer = setTimeout(() => {
            //props.displayMenu(true)
            onMore ? setOnMore(false) : setOnMore(true)
        }, 500)
        props.swiping ? clearTimeout(timer) : console.log('menu prevenido')
        setTT(timer)
    }


    const handleTM = (e, tiempoF = tiempo, maxi = 1, q = props.q) => {
        e.persist() //para ensenyar siemrpe el e
        console.log('[TM ITEM]: ', e.touches[0].clientX)
        setTouch(true)
        setSwipingClass(classes.swiping)

        document.documentElement.style
            .setProperty('--trans-time', '0s')

        if(!x){                 //si no hay valor de posicion anterior
            setX(e.touches[0].clientX)
        } else {
            if (Math.abs(transform) <= cap){
                setTransform(e.touches[0].clientX - x)
                if(Math.abs(transform) >= min){
                    clearTimeout(tTimer)
                    document.documentElement.style
                        .setProperty('--transform', `${transform}px`);
                    document.documentElement.style
                        .setProperty('--trans-time', `0s`);
                }
            } else {
                if(gotIn){
                    setMaxed(2)
                } else {
                    setMaxed(maxi)
                }
                if(!waiting){
                    let mientrasQ
                    console.log('[WABA]', maxi, q)

                    if (transform < 0){
                        mientrasQ = increaseQ(q)
                    } else if(!(maxi === 2 && q === 0)){
                        console.log('[IN]')
                        mientrasQ = decreaseQ(q)
                    } else{
                        mientrasQ = 0
                    }

                    setWaiting(true)
                    let lmao
                    let elTiempo = tiempoF - tiempoF/3
                    if(mientrasQ !== 0){
                        lmao = setTimeout( () => {
                            setWaiting(false)
                            setIn(true)
                            //setMaxed(2)
                            //console.log('[MAX]', maxed)
                            //console.log('[IN]', waiting, tiempo)
                            handleTM(e, elTiempo, 2, mientrasQ)
                        }, tiempoF)
                    }

                    setLwait(lmao)
                    //console.log('[TIEMPO]', tiempo)
                }
            }
        }
    }

    //const tStyle = {transform : `translateX(${transform})px`}

    const handleTE = () => {
        //console.log('[TIEMPO]', tiempo)
        console.log('[TE ITEM]')
        clearTimeout(tTimer)
        props.setQ('null')
        setMaxed(0)
        setTouch(false)
        setIn(false)
        clearTimeout(lwait)
        //console.log('ya')
        setWaiting(false)
        setSwipingClass(null)
        setX(null)
        setTiempo(1000)
        setTransform(0)
        document.documentElement.style
            .setProperty('--transform', `${0}px`)
        document.documentElement.style
            .setProperty('--trans-time', '.2s')

        //props.setQ(q)
        }
    return(
        <div className={classes.bigItemContainer}>
            <div id={props.lid}  onTouchStart={handleTS} onTouchMove={handleTM} onTouchCancel={handleTE} onTouchEnd={handleTE}
                className={`${swipingClass} ${classes.itemBox} ${classes[props.status]} ${classes['maxed'+maxed]}`}>
                <span className={classes.minus}>-<div className={classes.minusBack}></div></span>
                <span >{props.name} <span className={classes.q}>x{props.q}</span></span>
                <span className={classes.plus}>+<div className={classes.plusBack}></div></span>
            </div>
            <div className={classes.addInfoContainer+' '+(onMore?null:classes.hidden)}>
                <span>Store: {props.item.store ? props.item.store : null}</span>
                <span>Category: {props.item.category ? props.item.category : null}</span>
                <span>Price: {props.item.price ? props.item.price : null}</span>
            </div>
        </div>
    )
}

const mapState = (state) => ({
    currQ: state.currQ
})

const mapActions = (dispatch) => ({
    setQ: (currQ) => dispatch({type: 'SET_Q', currQ: currQ})

})
//const mapActions = (dispatch) => ({
//})
//
export default connect(mapState, mapActions)(Item)
