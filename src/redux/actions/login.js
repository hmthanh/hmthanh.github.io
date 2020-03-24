import {LOGIN, LOGIN_FAILED, LOGIN_SUCCESS} from './actionType'

export const Login = (state = {
    isLoading: true,
    errMess: null,
    data: []
}, action) => {
    switch (action.type) {
        case LOGIN:
            return {isLoading: true, errMess: null, data: []};
        case LOGIN_FAILED:
            return {...state, isLoading: false, errMess: action.payload, data: []};
        case LOGIN_SUCCESS:
            return {...state, isLoading: false, errMess: null, next: 0, data: {...action.payload}};
        default:
            return state;
    }
};