import React, { useState } from 'react'

import { connect, dispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import classes from './Hitbox.module.sass'

const Hitbox = (props) => {

    const [x, setX] = useState(null)
    const [transform, setTransform] = useState(0)
    const [tTimer, setTT] = useState(null)
    const [cap, setCap] = useState(50)
    const [coor, setCoor] = useState([null, null])
    const [onMenu, setOnMenu] = useState(false)

    const [focused, setFocus] = useState(false)

    const history = useHistory()

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

    const handleTS = () => {
        console.log('[TS]')
        let timer = setTimeout(() => {
            props.displayMenu(true)
            setOnMenu(true)
        }, 1000)
        setTT(timer)
    }

    let elements = ['fullscreen', 'logout', 'donate']
    const handleTM = (e) => {
        setCoor([e.touches[0].clientX, e.touches[0].clientY])
        console.log('[TM]')

        if(!x){                 //si no hay valor de posicion anterior
            setX(e.touches[0].clientX)
        } else if(!onMenu){
            if (Math.abs(transform) <= cap){
                setTransform(e.touches[0].clientX - x)
            } else {
                clearTimeout(tTimer)
                console.log(props.history)
                props.goBack()
            }
        } else {
            let element = document.elementFromPoint(...coor)
            //let element = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY)
            props.setHighlight(element.id)
            //console.log(element.id)
            for(let el of elements){
                console.log('[COMP]', el, element.id )
                if(element.id === el){
                    //console.log('YA')
                    document.getElementById(el).setAttribute("style", "font-weight:700;")
                    //break
                }else{
                    //console.log('VES')
                    document.getElementById(el).setAttribute("style", "")
                }
            }
        }
    }

    //const tStyle = {transform : `translateX(${transform})px`}

    const handleTE = () => {
        //console.log('[TIEMPO]', tiempo)
        if (onMenu){
            const element = document.elementFromPoint(...coor)
            console.log(element.id)
            props.displayMenu(false)
            switch(element.id){
                case 'donate':
                    console.log('MIS DINEROOOOS')
                    break
                case 'fullscreen':
                    document.querySelector("#bigContainer").requestFullscreen()
                    break
                case 'logout':
                    localStorage.clear()
                    history.push('/login')
                    break
                default:
                    console.log('no acertaste')
            }
        }
        clearTimeout(tTimer)
        console.log('[TE]')
        setX(null)
        setTransform(0)
        }

    return(
        <div onClick={handleDBL} onTouchStart={handleTS} onTouchMove={handleTM} onTouchCancel={handleTE} onTouchEnd={handleTE} className={classes.hitBox}>
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

const mapActions = dispatch => ({
    displayMenu: (value) => dispatch({type: 'SET_MENU', value: value}),
    setHighlight: (id) => dispatch({type: 'SET_HIGHLIGHT', id: id})
})

export default connect(null, mapActions)(Hitbox)
