import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import roorReducer from './reducers/index';
const middleware = [thunk];
const initialState = {};


const store = createStore(
            roorReducer, 
            initialState, 
            compose(
                    applyMiddleware(...middleware),
                    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
                ));

export default store; 