import React from 'react';
import classnames from 'classnames';
import PropTyeps from 'prop-types'

const SelectGroup = ({
    name,
    onChange,
    info,
    errors,
    value,
    options
}) => {
    const selectOptions = options.map(option => (
        <option key={option.label} value={option.value}>{option.label}</option>
    ))
    return (
        
        <div className="form-group">
            <select 
                className={classnames("invalid form-control form-control-lg",
                {
                    "is-invalid": errors
                })} 
                
                name={name}
                value={value}
                onChange= {onChange} >
                {selectOptions}
            </select>
            {info}
                {errors && <div className="invalid-feedback">{errors} </div>}
                
        </div>
    )
}

SelectGroup.propTypes = {
    name: PropTyeps.string.isRequired,
    value: PropTyeps.string.isRequired,
    info: PropTyeps.string,
    errors: PropTyeps.string,
    onChange: PropTyeps.func.isRequired,
    options: PropTyeps.array.isRequired
}



export default SelectGroup;
