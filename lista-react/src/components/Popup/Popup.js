import React, { useState, useEffect } from 'react'
import classes from './Popup.module.sass'

const Popup = (props) => {
    const [display, setDisplay] = useState(props.display)
    //useEffect(() => {
        //console.log('[DISPLAY]', display)
        ////setDisplay(true)
        //if(display){
            //setTimeout(() => {
                //setDisplay(false)
            //}, 2000)
        //}
    //}, [display])

    return (
        <div className={`${ props.display ? null : classes.hidden } ${classes[props.type]} ${classes.container} }`}>
            <span className={classes.text}>{props.children}</span>
        </div>
    )
}

export default Popup

