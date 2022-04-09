
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from '../actions/types'

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true, // when response from the server it will set FALSE!
    user: null
}
// eslint-disable-next-line
export default function(state = initialState, action) {

    const { type, payload } = action

    switch(type) {

        case REGISTER_SUCCESS:
            localStorage.setItem('token', payload.token)
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false  // loading done
            }
        case REGISTER_FAIL:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false   // loading still done
            }
        default:
            return state
    }   

}