import React from 'react';
import classnames from 'classnames';
import PropTyeps from 'prop-types'

const TextAreaField = ({
    name,
    placeholder,
    onChange,
    info,
    errors,
    value
}) => {
    return (
        <div className="form-group">
            <textarea 
                className={classnames("invalid form-control form-control-lg",
                {
                    "is-invalid": errors
                })} 
                placeholder={placeholder}
                name={name}
                value={value}
                onChange= {onChange}
                
                />
                {info}
                {errors && <div className="invalid-feedback">{errors} </div>}
                
        </div>
    )
}

TextAreaField.propTypes = {
    placeholder: PropTyeps.string,
    name: PropTyeps.string.isRequired,
    value: PropTyeps.string.isRequired,
    info: PropTyeps.string,
    errors: PropTyeps.string,
    onChange: PropTyeps.func.isRequired 
}



export default TextAreaField;
