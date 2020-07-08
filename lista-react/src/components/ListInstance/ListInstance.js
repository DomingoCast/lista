import React from 'react'

import { Link  }from 'react-router-dom'

import classes from './ListInstance.module.sass'

const listInstance = (props) => {
    return(
        <div className={classes.container}>
            <Link className={classes.link} to={{
                pathname: `/lista/${props.listaId}`,
            }}>{props.name}</Link>
        </div>
    )
}

export default listInstance
