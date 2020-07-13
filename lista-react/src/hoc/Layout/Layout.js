import React from 'react'

import { connect } from 'react-redux'

import Popup from '../../components/Popup/Popup'

import realVh from '../../util/real-vh'

import classes from './Layout.module.sass'

const layout = (props) => {
    realVh()
    return (
        <div id="bigContainer" className={classes.bigContainer}>
            <Popup type={props.type} display={props.display} text={props.text}/>
            {props.children}
        </div>
    )
}

const mapState = (state) => ({
    type: state.popup.type,
    display: state.popup.display,
    text: state.popup.text

})

export default connect(mapState)(layout)
