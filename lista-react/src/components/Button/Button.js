import React from 'react'

import classes from './Button.module.sass'

const button = (props) => {
    const click = (e) => {
        e.preventDefault()
        props.click()
    }
    let lbutton = <p> macarrones </p>
    switch(props.type){
        case "main":
            lbutton = (
                <a onClick={click} href="#" className={classes.buttonLink}>
                    <div className={classes.block}>
                        <span className={classes.text}>
                            {props.text}
                        </span>
                    </div>
                </a>
            )
            break
        default:
            lbutton=<p>ldefault</p>
    }
    return (
        <>
            {lbutton}
        </>
    )
}

export default button
