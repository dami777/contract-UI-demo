import React from 'react'

const Input = ({ label, type = "text", onChange, name, value }) => {
    return (
        <div className="input-group my-3">
            <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon3">{label}</span>
            </div>
            <input type={type} className="form-control" id="basic-url" aria-describedby="basic-addon3" onChange={onChange(name)} value={value} />
        </div>
    )
}

export default Input