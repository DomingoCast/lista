import React, { useState } from 'react'

import { connect } from 'react-redux'

import classes from './Menu.module.sass'



const Menu = (props) => {

    const [coor, setCoor] = useState([null, null])

    const handleTS = (e) => {
        setCoor([e.touches[0].clientX, e.touches[0].clientY])
        console.log('[TS.2]')
    }
    const handleTM = (e) => {
        console.log('[TM.2]')
        setCoor([e.touches[0].clientX, e.touches[0].clientY])
    }
    const handleTE = (e) => {
        console.log('[TE.2]')
        const element = document.elementFromPoint(...coor)
        console.log(element)
    }

    let style1, style2, style3
    const hStyle = {
        fontWeight: "700",
        color: "red"
    }
    console.log('[HIGHLIGHT]', props.highlight)
    if(props.highlight === 'logout'){
        console.log('JOLAS')
        style1 = {...hStyle}
    }
    if(props.highlight === 'fullscreen'){
        style2 = {...hStyle}
    }
    if(props.highlight === 'donate'){
        style3 = {...hStyle}
    }

    return(
        <div onTouchStart={handleTS} onTouchMove={handleTM} onTouchCancel={handleTE} onTouchEnd={handleTE} className={`${ props.display ? null : classes.hidden } ${classes.menuContainer} }`}>
            <a id="logout" className={`${classes.link} ${classes.logout} `} href="#">log out</a>
            <a id="fullscreen" className={`${classes.link} ${classes.fullScreen} `} href="#">full-screen</a>
            <a  id="donate" className={`${classes.link} ${classes.donate} `} href="#">donate</a>
        </div>
    )
}

const mapState = (state) => ({
    highlight: state.highlight
})

export default connect(mapState)(Menu)
