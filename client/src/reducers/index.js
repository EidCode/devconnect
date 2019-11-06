import { combineReducers } from 'redux';
import authReducers from './authReducer';
import errReducers from './errReducer';
import profileReducer from './profileReducer';
import postsReducer from './postsReducer'

export default combineReducers({
    auth: authReducers,
    errors: errReducers,
    profile: profileReducer,
    posts: postsReducer
})