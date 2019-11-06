import React from 'react';
import classnames from 'classnames';
import PropTyeps from 'prop-types'

const InputGroup = ({
    name,
    type,
    placeholder,
    onChange,
    icon,
    errors,
    value
}) => {
    return (
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text">
                    <i className={icon} />
                </span>
            </div>
            <input 
                type={type}
                className={classnames("invalid form-control form-control-lg",
                {
                    "is-invalid": errors
                })} 
                placeholder={placeholder}
                name={name}
                value={value}
                onChange= {onChange}
                
                />
                
                {errors && <div className="invalid-feedback">{errors} </div>}
                
        </div>
    )
}

InputGroup.propTypes = {
    placeholder: PropTyeps.string,
    name: PropTyeps.string.isRequired,
    value: PropTyeps.string.isRequired,
    icon: PropTyeps.string,
    errors: PropTyeps.string,
    onChange: PropTyeps.func.isRequired 
}
InputGroup.defaultProps = {
    type: 'text'
}


export default InputGroup;
