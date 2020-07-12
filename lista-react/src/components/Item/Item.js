import React, { useState, useEffect } from 'react'
import classes from './Item.module.sass'

import { connect, dispatch } from 'react-redux'

const Item = (props) => {

    const [x, setX] = useState(null)
    const [transform, setTransform] = useState(0)
    const [cap, setCap] = useState(50)
    const [swipingClass, setSwipingClass] = useState(null)
    const [maxed, setMaxed] = useState(0) // 0 para no, 1 para maxed, 2 para maxed y ha aguantado
    const [tiempo, setTiempo] = useState(500)
    const [waiting, setWaiting] = useState(false)
    const [touch, setTouch] = useState(false)
    const [update, setUpdate] = useState(false)
    const [lwait, setLwait] = useState(null)
    //const [q, setQ] = useState(props.q)
    const [borradoClass, setBorradoClass] = useState(null)
    const [gotIn, setIn] = useState(false)
    //const [touched, setTouched] = useState(null)


    //useEffect(() => {
        //console.log('macarrones', q)
        //if (q < 0){
        //}
    //}, [q, props])

    const increaseQ = (q) => {
        console.log('[INCREASE]')
        //console.log('[Q]', q)
        //clearTimeout(lwait)
        //const newQ = props.increase(q)
        return props.increase(q)
        //console.log(newQ)
        //setQ(newQ)

    }

    const decreaseQ = (q) =>{
        console.log('[DECREASE]')
        //if(props.q === 1){
            //document.documentElement.style
                //.setProperty('--trans-time', '.2s')
        //}
        return props.decrease(q)
        //if (response === 'bought'){
            //handleTE()
        //} else {
            //return response
        //}
    }

    const handleTM = (e, tiempoF = tiempo, maxi = 1, q = props.q) => {
        setTouch(true)
        setSwipingClass(classes.swiping)

        document.documentElement.style
            .setProperty('--trans-time', '0s')

        if(!x){                 //si no hay valor de posicion anterior
            setX(e.touches[0].clientX)
        } else {
            if (Math.abs(transform) <= cap){
                setTransform(e.touches[0].clientX - x)
                document.documentElement.style
                    .setProperty('--transform', `${transform}px`);
                document.documentElement.style
                    .setProperty('--trans-time', `0s`);
            } else {
                if(gotIn){
                    setMaxed(2)
                } else {
                    setMaxed(maxi)
                }
                if(!waiting){
                    //console.log('[Q]',props.q)
                    //console.log(timer)
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
                        },tiempoF)
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
        console.log('[TE]')
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
        <div id={props.lid} onTouchMove={handleTM} onTouchCancel={handleTE} onTouchEnd={handleTE}
            className={`${swipingClass} ${classes.itemBox} ${classes[props.status]} ${classes['maxed'+maxed]}`}>
            <span className={classes.minus}>-<div className={classes.minusBack}></div></span>
            <span >{props.name} <span className={classes.q}>x{props.q}</span></span>
            <span className={classes.plus}>+<div className={classes.plusBack}></div></span>
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
