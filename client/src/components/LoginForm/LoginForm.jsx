import React from 'react';

function Capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
    }

export function Form(props) {

    return (
        <form className={props.size}>
            {props.children}
        </form>
    )
};

export function Input(props) {

    return (
        <div className={`hoverable col ${props.size}`}>
            <label>
                {Capitalize(props.name)}:
            <input className={`${props.customClass}`} name={props.name} {...props}/>
            </label>
        </div>
    );
};


export function TextArea(props) {

    return (
        <div className={`col ${props.size}`}>
        <label>
            {Capitalize(props.name)}:
        <textarea className={`materialize-textarea ${props.customClass}`} {...props}></textarea>
        </label>
      </div>
        );
}

export function FormBtn(props) {

    return (
        <button {...props} className={props.customClass}>
            {props.children}    
        </button>
    );
}
