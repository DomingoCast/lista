import React, { useState } from 'react'

import { connect, dispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import InputMobile from '../InputMobile/InputMobile'

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
        const data = {
            item:{
                name: null,
                store: document.getElementById('store').value,
                price: document.getElementById('price').value,
                category: document.getElementById('category').value,
            },
            q: 1
        }
        console.log('[ADD INFO]', data)

        console.log('INPUT', input)
        const divided = input.split(' ')
        console.log('DIVIDED', divided)
        if(!input){
            return null
        }else if(divided[divided.length - 1][0] === 'x' && parseInt(divided[divided.length - 1].slice(1))){
            console.log('aqui he llegado', divided.slice(divided.length - 1).join(''), parseInt(divided[divided.length - 1].slice(1)))
            const result =[divided.slice(0, divided.length - 1).join(' '), parseInt(divided[divided.length - 1].slice(1))]
            data.item.name = divided.slice(0, divided.length - 1).join(' ')
            data.q = parseInt(divided[divided.length - 1].slice(1))

            console.log('[RESULT]', result)
            //return result
        } else {
            data.item.name = input
            data.q = 1
        }
        return data
    }

    const parseLista = input => {
        return input
    }

    const clearInputs = () => {
        document.getElementById("store").value = ""
        document.getElementById("category").value = ""
        document.getElementById("price").value = ""
        document.getElementById("searchInput").value = ""
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const value = document.querySelector('#searchInput').value
        props.setMInput('hidden')

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

        clearInputs()

        return props.submit(parsed)

    }

    const handleTS = () => {
        console.log('[TS]')
        let timer = setTimeout(() => {
            props.displayMenu(true)
            props.swiping ? console.log('menu abortado') : setOnMenu(true)
        }, 1000)
        props.swiping ? clearTimeout(timer) : console.log('menu prevenido')
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
                if(element.id === el || element.id === el+'Div' || element.parentElement.id === el){
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
                case 'donateDiv':
                    console.log('MIS DINEROOOOS')
                    break
                case 'fullscreen':
                    document.querySelector("#bigContainer").requestFullscreen()
                    break
                case 'fullscreenDiv':
                    document.querySelector("#bigContainer").requestFullscreen()
                    break
                case 'logout':
                    localStorage.clear()
                    history.push('/login')
                    break
                case 'logoutDiv':
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
        <div onClick={handleDBL} onTouchStart={handleTS} onTouchMove={props.swiping ? null : handleTM} onTouchCancel={handleTE} onTouchEnd={handleTE} className={classes.hitBox}>
            <div className={classes.suggestions}></div>
            <form onSubmit={handleSubmit}>
                <InputMobile categories={['store', 'category', 'price']} focused={focused}/>
                <input className={classes.submitBtn}type="submit"/>
            </form>
        </div>
    )
}

const mapState = (state) => ({
    swiping: state.swiping
})

const mapActions = dispatch => ({
    displayMenu: (value) => dispatch({type: 'SET_MENU', value: value}),
    setHighlight: (id) => dispatch({type: 'SET_HIGHLIGHT', id: id}),
    setMInput: (value) => dispatch({type: 'SET_MINPUT', value: value}),
})

export default connect(mapState, mapActions)(Hitbox)
