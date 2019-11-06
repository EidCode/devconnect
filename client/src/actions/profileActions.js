import axios from 'axios';
import {GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_ERRORS, SET_CURRENT_USER, GET_PROFILES} from './types';

export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios.get('/api/profile/')
        .then(res => {
            console.log(res.data)
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        }).catch(err => {
            dispatch({
                type: GET_PROFILE, 
                payload: {}
            })
        })
}


export const createProfile = (profileData, history) => dispatch => {
    axios.post('/api/profile', profileData)
    .then(res => history.push('/dashboard'))
    .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }))
}

export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
}

export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    }
}

export const deleteProfile = () => dispatch => {
    if(window.confirm('are you sure ?')) {
            axios.delete('/api/profile')
            .then(res => {
                dispatch({
                    type: SET_CURRENT_USER,
                    payload: {}
                })
            }).catch(err => dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }))
    }
    
}

export const AddExperience = (newExperience, history) => dispatch => {
    axios.post('/api/profile/experiences', newExperience)
        .then(res => history.push('/dashboard'))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}

export const AddNewEducation = (newEdu, history) => dispatch => {
    axios.post('/api/profile/education', newEdu)
        .then(res => history.push('/dashboard'))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}

export const deleteExperience = (exp_id) => dispatch => {
    if(window.confirm('are you sure ?')) {
            axios.delete(`/api/profile/experiences/${exp_id}`)
            .then(res => dispatch({
                type: GET_PROFILE,
                payload: res.data
            })).catch(err => dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }))
    }
    
}

export const deleteEducation = (edu_id) => dispatch => {
    if(window.confirm('are you sure ?')) {
            axios.delete(`/api/profile/education/${edu_id}`)
            .then(res => dispatch({
                type: GET_PROFILE,
                payload: res.data
            })).catch(err => dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }))
    }
    
}

export const getProfiles = () => dispatch => {
    dispatch(setProfileLoading());
    axios.get('/api/profile/all')
        .then(res => {
            console.log(res.data)
            dispatch({
                type: GET_PROFILES,
                payload: res.data
            })
        }).catch(err => {
            dispatch({
                type: GET_PROFILES, 
                payload: null
            })
        })
}

export const getProfileByHandle = (handle) => dispatch => {
    dispatch(setProfileLoading());
    axios.get(`/api/profile/handle/${handle}`)
        .then(res => {
            console.log(res.data)
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        }).catch(err => {
            dispatch({
                type: GET_PROFILE, 
                payload: null
            })
        })
}