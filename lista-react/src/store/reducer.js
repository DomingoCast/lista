const initialState = {
    token: 'camarelos',
    currQ: 'null',
    popup: {
        display: false,
        text: '',
        type: null
    },
    displayMenu: false,
    highlight: null,
    swiping: null,
    moreInput: 'hidden'
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
        case 'SET_SWIPING':
            return {
                ...state,
                swiping: action.name
            }
        case 'SET_MINPUT':
            return {
                ...state,
                moreInput: action.value
            }
        default:
            return state
    }

}

export default reducer


