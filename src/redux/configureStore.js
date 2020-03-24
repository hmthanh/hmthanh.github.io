import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { GetHistoryInfo } from './actions/getHistory'

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            HistoryInfo: GetHistoryInfo,
        }),
        applyMiddleware(logger),
        applyMiddleware(thunk),
    );

    return store;
};