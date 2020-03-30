import React from 'react';


function Card(props) {

    return (
                    <div className={`card hoverable ${props.color} ${props.customClass}`}>
                        <div className="card-content white-text">
                            <h1 className="card-title">{props.title}</h1>
                            {props.children}
                            <br/>
                            <div className="card-action">
                                {/*<------- submit button location -----> */}
                            {props.action}    
                            </div>
                            <br/>
                            <br/>
                            {props.bottomLink}
                        </div>
                    </div>
    )
}


export default Card;