import React from 'react';

const Field = ({ label, placeholder, value, name, handleChange }) => (
    <div className="field">
        <label className="label">{label}</label>
        <div className="control">
            <input
                className="input"
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                name={name}
            />
        </div>
    </div>
);


export default Field