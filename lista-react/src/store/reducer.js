const initialState = {
    token: 'camarelos'
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
        default:
            return state
    }

}

export default reducer


