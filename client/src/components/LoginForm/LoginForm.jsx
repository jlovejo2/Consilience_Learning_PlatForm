import React from 'react';

export function Form(props) {

    return (
        <form className={props.size}>
            {props.children}
        </form>
    )
};

export function Input(props) {

    function Capitalize(str){
        return str.charAt(0).toUpperCase() + str.slice(1);
        }

    return (
        <div className={`hoverable col ${props.size}`}>
            <label>
                {Capitalize(props.name)}:
            <input placeholder={props.placeholder} name={props.name} required type={props.requiredType} className={`${props.customClass}`} />
            </label>
        </div>
    );
};

