const validator = require('validator');
const isEmpty = require('./is-Empty')

module.exports = function validatePostInput(data) {
    let errors = {};
    data.text = !isEmpty(data.text) ? data.text : '';
    if(validator.isEmpty(data.text)) {
        errors.text = 'text field is required'
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}