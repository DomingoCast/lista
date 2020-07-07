import React, { useState } from 'react'

import classes from './Lista.module.sass'

import Item from '../../components/Item/Item'

const Lista = (props) => {
    const [items, addItem] = useState([
        {
            name: "macarromes",
            q: 1,
            status: null,
            id: 1

        },
        {
            name: "peras",
            q: 15,
            status: null,
            id: 2
        },
        {
            name: "pizzas",
            q: 2,
            status: "bought",
            id: 3
        }
    ])

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
    const handleSubmit = () => console.log('[SUBMIT]')

    const listItems = items.map(item => (
        <Item name={item.name} q={item.q} status={item.status}/>
    ))

    //{/* onFocus={handleDBL} onBlur={handleDBL} */}
    return(
        <div className={classes.bigContainer}>
            <h1 className={classes.h1}>lista familia</h1>
            <div className={classes.itemsContainer}>
                {listItems}
            </div>
            <div onClick={handleDBL} className={classes.hitBox}>
                <div className={classes.suggestions}></div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        id="searchInput"
                        className={focused ? classes.focused : classes.unFocused}
                    />
                </form>
            </div>
        </div>
    )
}

export default Lista
