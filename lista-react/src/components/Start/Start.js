import React, {useEffect} from 'react'

import classes from './Start.module.sass'

import Button from '../Button/Button'

const Start = (props) =>{
    const buttonClick = () => {
        document.querySelector("#bigContainer").requestFullscreen()
        props.history.push('/login')
    }
    //useEffect(() => {
        //setTimeout(window.scrollTo(0,1),100);
    //})
    return(
        <>
        <h1 className={classes.h1}> lista </h1>
        <div className={classes.button}>
            <Button type="main" click={buttonClick} text="start"/>
        </div>
        </>
    )
}

export default Start
