import React from 'react';
import './style.css';

function Card(props) {

    return (
                    <div className={`card ${props.size} hoverable ${props.color} ${props.customClass}`}>
                        <div className="card-content white-text">
                            {/* <div class='row'> */}
                            <span className="card-title">{props.title}</span>
                            {props.children}
                            {/* </div> */}
                            {/* <br/> */}
                            <p></p>
                        </div>
                        <div className="card-action">
                                {/*<------- submit button location -----> */}
                            {props.action}   
                            <br/>
                            <br/>
                            {props.bottomLink}
                            </div>
                    </div>
    )
}


export default Card;