import React, { useState, useEffect } from 'react'
import classes from './Item.module.sass'

const Item = (props) => {

    const [x, setX] = useState(null)
    const [transform, setTransform] = useState(0)
    const [cap, setCap] = useState(50)
    const [swipingClass, setSwipingClass] = useState(null)
    const [tiempo, setTiempo] = useState(1000)
    const [waiting, setWaiting] = useState(false)
    const [touch, setTouch] = useState(false)
    const [update, setUpdate] = useState(false)
    const [lwait, setLwait] = useState(null)
    const [q, setQ] = useState(props.q)
    const [borradoClass, setBorradoClass] = useState(null)
    //const [touched, setTouched] = useState(null)


    //useEffect(() => {
        //console.log('macarrones', q)
        //if (q < 0){
            //cosas = null
        //}
    //})

    const increaseQ = (theQ) => {
        console.log('[INCREASE]')
        clearTimeout(lwait)
        props.increase()
    }

    const decreaseQ = () =>{
        console.log('[DECREASE]')
        props.decrease()
    }

    const handleTM = (e, tiempoF = tiempo) => {
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
                //console.log('[OUT]', timer)
                //console.log(timer)
                //console.log('[waiting out]', waiting)
                if(!waiting){
                    console.log('[Q]',props.q)
                    //console.log(timer)
                    transform < 0 ? increaseQ(q) : decreaseQ(q)
                    setWaiting(true)
                    let lmao
                    let elTiempo = tiempoF - tiempoF/3

                    lmao = setTimeout( () => {
                        setWaiting(false)
                        //console.log('[IN]', waiting, tiempo)
                        handleTM(e, elTiempo)

                    },tiempoF)
                    setLwait(lmao)
                    //console.log('[TIEMPO]', tiempo)

                }
            }
        }
    }

    //const tStyle = {transform : `translateX(${transform})px`}

    const handleTE = () => {
        //console.log('[TIEMPO]', tiempo)
        //console.log('[TE]')
        setTouch(false)
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
        <div id={props.lid} onTouchMove={handleTM} onTouchCancel={handleTE} onTouchEnd={handleTE} className={`${swipingClass} ${classes.itemBox} ${classes[props.status]}`}>
            <span className={classes.minus}>-</span>
            <span >{props.name} <span className={classes.q}>x{props.q}</span></span>
            <span className={classes.plus}>+</span>
        </div>
    )
}
export default Item
