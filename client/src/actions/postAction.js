import axios from 'axios';
import {GET_POST, GET_POSTS, DELETE_POST, ADD_POST, GET_ERRORS, POST_LOADING, CLEAR_ERRORS} from './types'

export const addPost = (postData) => dispatch => {
    dispatch(clearErrors());
    axios.post('/api/posts', postData)
        .then(res => dispatch({
            type: ADD_POST,
            payload: res.data
        })).catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}
export const addLike = (postId) => dispatch => {
    axios.post(`/api/posts/like/${postId}`)
        .then(res => dispatch(getPosts())).catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}

export const unLike = (postId) => dispatch => {
    axios.post(`/api/posts/unlike/${postId}`)
        .then(res => dispatch(getPosts())).catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}


export const getPosts = () => dispatch => {
    dispatch(postLoading());
    axios.get('/api/posts')
        .then(res => dispatch({
            type: GET_POSTS,
            payload: res.data
        })).catch(err => dispatch({
            type: GET_POSTS,
            payload: null
        }))
}



export const deletePost = (id) => dispatch => { 
    axios.delete(`/api/posts/${id}`)
        .then(res => dispatch({
            type: DELETE_POST,
            payload: id
        })).catch(err => dispatch({
            type: GET_POSTS,
            payload: null
        }))
}

export const getPost = (id) => dispatch => {
    dispatch(postLoading());
    axios.get(`/api/posts/${id}`)
        .then(res => dispatch({
            type: GET_POST,
            payload: res.data
        })).catch(err => dispatch({
            type: GET_POST,
            payload: null
        }))
}

export const postLoading = () =>  {
    return {
        type: POST_LOADING
    }
}

export const addComment = (postId, commentData) => dispatch => {
    dispatch(clearErrors());
    axios.post(`/api/posts/comments/${postId}`, commentData)
        .then(res => dispatch({
            type: GET_POST,
            payload: res.data
        })).catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}



export const deleteComment = (postId, commentId) => dispatch => { 
    axios.delete(`/api/posts/deleteComment/${postId}/${commentId}`)
        .then(res => dispatch({
            type: GET_POST,
            payload: res.data
        })).catch(err => dispatch({
            type: GET_POSTS,
            payload: null
        }))
}


export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    }
}