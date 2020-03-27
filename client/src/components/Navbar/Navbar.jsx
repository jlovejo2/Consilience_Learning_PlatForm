import React from "react";
import './Navbar.css';
import Consilience from '../../images/convergence.jpg'
import { Link } from 'react-router-dom';

const Navbar = () => {

    // use state expanded and setExpanded onClick
    // circle back puta
  return (
      <React.Fragment>
        <nav className="navbar navbar-expand-md navbar-dark sticky-top bg-dark">
            <Link
                to="/" 
                className="navbar-brand">
                <img src={Consilience} alt="react" className="img-fluid logo" height="99.66px" width="200px"/>
            </Link>
            
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
            <span className="navbar-toggler-icon" />
            </button>
        <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link 
                            to="/" 
                            className={
                                window.location.pathname === "/" || window.location.pathname === "/home"
                                ? "nav-link active"
                                : "nav-link"
                            }>
                            Home
                        </Link>
                    </li>
                    &nbsp;|&nbsp;
                    <li className="nav-item">
                        <Link
                            to="/search" 
                            className={
                                window.location.pathname === "/search"
                                    ? "nav-link active"
                                    : "nav-link" 
                            }>
                            Search
                        </Link>
                    </li>
                    &nbsp;|&nbsp;
                    <li className="nav-item">
                        <Link
                            to="/saved" 
                            className={
                                window.location.pathname === "/saved"
                                ? "nav-link active"
                                : "nav-link"
                            }>
                            Saved
                        </Link>
                    </li>
                </ul>
           </div>
    </nav>
    </React.Fragment>
  )
}

export default Navbar;