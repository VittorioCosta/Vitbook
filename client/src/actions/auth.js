

import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_PROFILE
} from './types'
import { setAlert } from './alert'
import api from '../utils/api'


// LOAD USER
export const loadUser = ()=> async dispatch => {

    try {
        const res = await api.get('/auth');

        dispatch({
            type: USER_LOADED,
            payload: res.data
        });

    } catch (err) {
    dispatch({
        type: AUTH_ERROR
    });
    }
}



// REGISTE USER
export const register = ({ name, email, password }) => async dispatch => {

   
    const body = JSON.stringify({ name, email, password })

    try {
        const res = await api.post('/users', body);
    
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data
        });
        dispatch(loadUser());
    } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
        type: REGISTER_FAIL
    });
    }
}
    


// LOGIN USER   
export const login = ( email, password ) => async dispatch => {


    const body = JSON.stringify({ email, password })

    try {
        const res = await api.post('/auth', body);
    
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data
        });
    
        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: LOGIN_FAIL
        })
    }
}

// LOGOUT / CLEAR PROFILE
export const logout = ()=> dispatch => {
    dispatch({ type: CLEAR_PROFILE })
    dispatch({ type: LOGOUT })
}