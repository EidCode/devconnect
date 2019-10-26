import React from 'react';
import classnames from 'classnames';
import PropTyeps from 'prop-types'

const TextFieldComponent = ({
    name,
    placeholder,
    onChange,
    type,
    label,
    info,
    errors,
    value,
    disabled
}) => {
    return (
        <div className="form-group">
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
                disabled={disabled}
                />
                {info}
                {errors && <div className="invalid-feedback">{errors} </div>}
                
        </div>
    )
}

TextFieldComponent.propTypes = {
    type: PropTyeps.string.isRequired,
    placeholder: PropTyeps.string,
    name: PropTyeps.string.isRequired,
    value: PropTyeps.string.isRequired,
    info: PropTyeps.string,
    errors: PropTyeps.string,
    onChange: PropTyeps.func.isRequired,
    disabled: PropTyeps.string
}

TextFieldComponent.defaultProps = {
    type: 'text'
}

export default TextFieldComponent;
