import React, { useState } from 'react'

import classes from './Input.module.sass'

const Input = (props) => {
    const [invalidClass, setInvalidClass] = useState(null)
    const valUsername = (e) => {
        const username = e.target.value
        const re = /^[a-zA-Z]{2,10}$/
        console.log(e.target.value)
        if(!re.test(username)){
            setInvalidClass(classes.invalid + ' invalid ') //para poder ver desde fuera si invalid
        }else{
            setInvalidClass(null)
        }
    }
    const valDoublePassword = () => {
        const val1 = document.getElementById('password1').value
        const val2 = document.getElementById('password2').value
        console.log(val1, 'ss'+val2+'ss', typeof(val2))
        if(val2 !== "" && val1 !== val2){
            setInvalidClass(classes.invalid + ' invalid ') //para poder ver desde fuera si invalid
        } else{
            setInvalidClass(null)
        }
    }

    let inputC
    switch (props.type){
        case 'username':
            inputC = <input type="text" onBlur={valUsername} placeholder="username" id="username" spellCheck="false"
                        className={`${invalidClass} ${classes.input}`}/>
            break
        case 'password':
            inputC = <input type="text" placeholder="password" id="password" spellCheck="false"
                        className={`${classes.input} ${classes.password}`}/>
            break
        case 'doublePassword':
            inputC = (
                <>
                    <input type="text" onBlur={valDoublePassword} placeholder="password" id="password1" spellCheck="false"
                        className={`${invalidClass} ${classes.input} ${classes.password}`}/>
                    <input type="text" onBlur={valDoublePassword} placeholder="passwordx2" id="password2" spellCheck="false"
                        className={`${invalidClass} ${classes.input} ${classes.password}`}/>
                </>
                )
            break
        default:
            inputC = <p style={{color: 'red'}}> fallaste </p>
    }

    return(
        <>{inputC}</>
    )
}

export default Input
