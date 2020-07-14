import React, { useState } from 'react'

import { connect } from 'react-redux'

import classes from './Menu.module.sass'



const Menu = (props) => {

    return(
        <div className={`${ props.display ? null : classes.hidden } ${classes.menuContainer} }`}>
            <div id="logoutDiv" className={classes.aContainer}>
                <a id="logout" className={`${classes.link} ${classes.logout} `} href="#"><span className={classes.word}>log</span><span className={classes.word}>out</span></a>
            </div>
            <div id="fullscreenDiv" className={classes.aContainer}>
                <a id="fullscreen" className={`${classes.link} ${classes.fullScreen} `} href="#"><span className={classes.word}>full-</span><span className={classes.word}>screen</span></a>
            </div>
            <div id="donateDiv" className={classes.aContainer}>
                <a  id="donate" className={`${classes.link} ${classes.donate} `} href="#">donate</a>
            </div>
        </div>
    )
}

const mapState = (state) => ({
    highlight: state.highlight
})

export default connect(mapState)(Menu)
