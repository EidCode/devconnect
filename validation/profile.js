const validator = require('validator');
const isEmpty = require('./is-Empty');

module.exports = function validateProfileInput(data) {
    let errors = {};
    
    data.handle = !isEmpty(data.handle) ? data.handle : '';
    data.status = !isEmpty(data.status) ? data.status : '';
    data.skills = !isEmpty(data.skills) ? data.skills : '';
    
    if(!validator.isLength(data.handle, {min: 2, max: 40})) {
        errors.handle = 'handle must be between 2 and 40 characters'
    }
    if(validator.isEmpty(data.handle)) {
        errors.handle = 'handle field is required'
    }
    if(validator.isEmpty(data.status)) {
        errors.status = 'status field is required'
    }
    if(validator.isEmpty(data.skills)) {
        errors.skills = 'skills field is required'
    }
    if(!isEmpty(data.website)) {
        if(!validator.isURL(data.website)) {
            errors.website = 'Not a  Valid URL'
        }
    }
    if(!isEmpty(data.youtube)) {
        if(!validator.isURL(data.youtube)) {
            errors.youtube = 'Not a  Valid URL'
        }
    }
    if(!isEmpty(data.instgram)) {
        if(!validator.isURL(data.instgram)) {
            errors.instgram = 'Not a  Valid URL'
        }
    }
    if(!isEmpty(data.twitter)) {
        if(!validator.isURL(data.twitter)) {
            errors.twitter = 'Not a  Valid URL'
        }
    }
    if(!isEmpty(data.linkedin)) {
        if(!validator.isURL(data.linkedin)) {
            errors.linkedin = 'Not a  Valid URL'
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}