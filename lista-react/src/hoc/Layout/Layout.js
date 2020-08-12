import React from 'react'

import { connect } from 'react-redux'

import Popup from '../../components/Popup/Popup'
import Menu from '../../components/Menu/Menu'

import realVh from '../../util/real-vh'

import classes from './Layout.module.sass'

const layout = (props) => {
    realVh()
    return (
        <div id="bigContainer" className={classes.bigContainer}>
            <div className={classes.phone}>
                <Popup type={props.type} display={props.display} text={props.text}/>
                {props.children}
                <Menu display={props.displayMenu}/>
            </div>
        </div>
    )
}

const mapState = (state) => ({
    type: state.popup.type,
    display: state.popup.display,
    text: state.popup.text,
    displayMenu: state.displayMenu

})

export default connect(mapState)(layout)
