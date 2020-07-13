const initialState = {
    token: 'camarelos',
    currQ: 'null',
    popup: {
        display: false,
        text: '',
        type: null
    },
    displayMenu: false,
    highlight: null
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
        case 'SET_MENU':
            return{
                ...state,
                displayMenu: action.value
            }
        case 'SET_HIGHLIGH':
            return {
                ...state,
                highlight: action.id
            }
        default:
            return state
    }

}

export default reducer


