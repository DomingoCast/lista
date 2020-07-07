import React from 'react'
import classes from './Item.module.sass'

const item = (props) => (
    <span className={classes[props.status]}>{props.name} x{props.q}</span>
)

export default item
