import React/*, { useState, useEffect }*/ from 'react'
import classes from './Popup.module.sass'

const Popup = (props) => {
    //pongo props.text y props.children por si quiero volver a cambiar lmao
    return (
        <div className={`${ props.display ? null : classes.hidden } ${classes[props.type]} ${classes.container} }`}>
            <span className={classes.text}>{props.text}{props.children}</span>
        </div>
    )
}

export default Popup

