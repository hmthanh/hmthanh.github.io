import {HISTORY_FAILED, HISTORY_LOADING, HISTORY_SUCCESS} from '../../constants/ActionType'

export const GetHistoryInfo = (state = {
    isLoading: true,
    errMess: null,
    data: []
}, action) => {
    switch (action.type) {
        case HISTORY_FAILED:
            return {isLoading: true, errMess: null, data: []};
        case HISTORY_LOADING:
            return {...state, isLoading: false, errMess: action.payload, data: []};
        case HISTORY_SUCCESS:
            return {...state, isLoading: false, errMess: null, next: 0, data: {...action.payload}};
        default:
            return state;
    }
};