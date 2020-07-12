import React, { useState } from 'react'

import classes from './Hitbox.module.sass'

const Hitbox = (props) => {

    const [focused, setFocus] = useState(false)

    const handleDBL = () => {
        console.log('[FOCUS]: ',focused)
        const linput = document.querySelector('#searchInput')
        if(focused){
            setFocus(false)
            linput.blur()
        }else {
            setFocus(true)
            linput.focus()
        }
    }

    const parseOrder = input => {
        console.log('INPUT', input)
        const divided = input.split(' ')
        console.log('DIVIDED', divided)
        if(!input){
            return null
        }else if(divided[divided.length - 1][0] === 'x' && parseInt(divided[divided.length - 1].slice(1))){
            console.log('aqui he llegado', divided.slice(divided.length - 1).join(''), parseInt(divided[divided.length - 1].slice(1)))
            const result =[divided.slice(0, divided.length - 1).join(' '), parseInt(divided[divided.length - 1].slice(1))]
            console.log('[RESULT]', result)
            return result
        } else {
            return [input, 1]
        }
    }

    const parseLista = input => {
        return input
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const value = document.querySelector('#searchInput').value

        let parsed
        switch(props.type){
            case 'order':
                parsed = parseOrder(value)     // parsed[0] = name, parsed[1] = q
                break
            case 'lista':
                parsed = parseLista(value)
                break
            default:
                parsed = null
        }

        return props.submit(parsed)

    }

    return(
        <div onClick={handleDBL} className={classes.hitBox}>
            <div className={classes.suggestions}></div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="searchInput"
                    className={focused ? classes.focused : classes.unFocused}
                />
                <input className={classes.submitBtn}type="submit"/>
            </form>
        </div>
    )
}

export default Hitbox
