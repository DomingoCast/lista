const initialState = {
    token: 'camarelos',
    currQ: 'null'
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
        default:
            return state
    }

}

export default reducer


