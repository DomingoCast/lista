import React from 'react'

import classes from './Start.module.sass'

import Button from '../Button/Button'

const Start = (props) =>{
    const buttonClick = () => {
        props.history.push('/lista')
    }

    return(
    <div className={classes.bigContainer}>
        <h1 className={classes.h1}> lista </h1>
        <div className={classes.button}>
            <Button type="main" click={buttonClick} text="start"/>
        </div>
    </div>
    )
}

export default Start
