import React, { useState, useEffect } from 'react'
import classes from './InputMobile.module.sass'

import { connect, dispatch } from 'react-redux'


const InputMobile = (props) => {
    const [x, setX] = useState(null)
    const [transform, setTransform] = useState(0)
    const [cap, setCap] = useState(50)
    const [inputValue, setIValue] = useState(null)
    const [hideMore, setHMore] = useState('hidden')
    const [hideInput, setHInput] = useState(null)


    const handleTM = (e) => {
        console.log('[TM]')
        if(!x){                 //si no hay valor de posicion anterior
            setX(e.touches[0].clientX)
            props.setSwiping('input')
        } else{
            if (Math.abs(transform) <= cap){
                setTransform(e.touches[0].clientX - x)
            } else {
                setIValue(document.getElementById("searchInput").value)
                setHInput('hidden')
                setHMore(null)
                props.setMInput(null)
            }
        }
    }

    const handleTE = () => {
        console.log('[TE]')
        //props.setSwiping(null)
        setX(null)
        setTransform(0)
    }

    const focused = props.focused ? classes.focused : classes.unFocused
    console.log('[CAT]', props.categories)
    const categories = props.categories.map( cat => <input id={cat} className={classes.catInput} type="text" placeholder={ cat }/>)

    const handleFocus = () => {
        console.log('OLAA')
        setHMore('hidden')
        props.setMInput('hidden')
    }

    return (
        <div onTouchMove={handleTM} onTouchCancel={handleTE} onTouchEnd={handleTE} className={classes.inputContainer}>
            <input
                type="text"
                id="searchInput"
                className={focused+' '+classes.mainInput+' '+(props.moreInput?null:classes.hidden)/*+classes[hideInput]*/}
                onFocus={handleFocus}
            />
            <div className={classes.moreContainer + ' ' + classes[props.moreInput]}>
                <h3 className={classes.h3}>{inputValue}</h3>
                <div className={ classes.catContainer}>
                    {categories}
                </div>
            </div>
        </div>
    )
}
const mapState = (state) => ({
    moreInput: state.moreInput
})
const mapActions = (dispatch) => ({
    setSwiping: (name) => dispatch({type: 'SET_SWIPING', name: name}),
    setMInput: (value) => dispatch({type: 'SET_MINPUT', value: value})
})
export default connect(mapState, mapActions)(InputMobile)
