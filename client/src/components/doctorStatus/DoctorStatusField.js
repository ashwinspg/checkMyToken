import React from 'react';

export const textField = ({ input, label, value, meta: { error, touched } }) => {
    return (
        <div>
            <label>{label}</label>
            <input {...input} style={{ marginBottom: '5px' }} />
            <div className="red-text" style={{ marginBottom: '20px' }}>
                {touched && error}
            </div>
        </div>
    );
};

export const dropDownField = ({ input, label, meta: { error, touched }, children }) => {
    return (
        <div>
            <label>{label}</label>
            <div className="input-field col s12">
                <select {...input} style={{ marginBottom: '5px' }}>
                    {children}
                </select>
            </div>
            <div className="red-text" style={{ marginBottom: '20px' }}>
                {touched && error}
            </div>
        </div>
    );
};