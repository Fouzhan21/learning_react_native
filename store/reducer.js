const initialState = {
    ip: '1.1.1.1'
}

export default function appReducer(state = initialState, action) {
    switch (action.type) {

        case 'SAVE_IP':
            return {
                ...state,
                ip: action.payload
            }
        default:
            return state
    }
}