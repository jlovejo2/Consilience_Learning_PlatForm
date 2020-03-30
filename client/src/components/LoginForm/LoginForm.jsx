import React from 'react';

export function Form(props) {

    return (
        <form>
            {props.children}
        </form>
    )
};

export function Input(props) {

    return (
    <div className="row">
        <div className="input-field hoverable col">
            <input placeholder={props.placeholder} name={props.name} required type={props.requiredType} className={`${props.customClass}`} />
            <label htmlFor={props.name}><p>{props.label}</p></label>
        </div>
    </div>
    );
};

