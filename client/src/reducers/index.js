import { combineReducers } from 'redux';
import authReducers from './authReducer';
import errReducers from './errReducer';
import profileReducer from './profileReducer';

export default combineReducers({
    auth: authReducers,
    errors: errReducers,
    profile: profileReducer
})