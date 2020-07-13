const initialState = {
    token: 'camarelos',
    currQ: 'null',
    popup: {
        display: false,
        text: '',
        type: null
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case 'SET_TOKEN':
            return {
                ...state,
                token: action.token
            }
        case 'DELETE_TOKEN':
            return {
                ...state,
                token: null
            }
        case 'SET_Q':
            return {
                ...state,
                currQ: action.currQ
            }
        case 'SET_POPUP':
            return {
                ...state,
                popup: {
                    ...state.popup,
                    ...action.popData
                }
            }
        default:
            return state
    }

}

export default reducer


