import axios from 'axios';

const setAuthToken = token => {
    if(token) {

        // instead of postman
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        delete axios.defaults.headers.common['Authorization']
    }
}


export default setAuthToken;