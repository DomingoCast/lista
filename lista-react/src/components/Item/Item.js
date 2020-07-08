import React, { useState } from 'react'
import classes from './Item.module.sass'

const Item = (props) => {

    const [x, setX] = useState(null)
    const [transform, setTransform] = useState(0)

    const handleTM = (e) => {
        document.documentElement.style
            .setProperty('--trans-time', '0s')
        console.log('a')
        console.log('[x]: ',e.touches[0].clientX, '[y]: ', e.touches[0].clientY)
        if(!x){
            setX(e.touches[0].clientX)
        } else {
            setTransform(e.touches[0].clientX - x)
            document.documentElement.style
                .setProperty('--transform', `${transform}px`);
            document.documentElement.style
                .setProperty('--trans-time', `0s`);

        }
    }

    //const tStyle = {transform : `translateX(${transform})px`}

    const handleTE = () => {
        console.log('[TE]')
        setX(null)
        setTransform(0)
        document.documentElement.style
            .setProperty('--transform', `${0}px`)
        document.documentElement.style
            .setProperty('--trans-time', '.2s')
        }

    return(
        <div onTouchMove={handleTM} onTouchCancel={handleTE} onTouchEnd={handleTE} className={classes.itemBox}>
            <span className={classes.minus}>-</span>
            <span className={classes[props.status]}>{props.name} x{props.q}</span>
            <span className={classes.plus}>+</span>
        </div>
    )
}
export default Item
