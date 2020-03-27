import React from "react";
import './Navbar.css';
import Questions from '../../images/feynman.jpg'
import { Link } from 'react-router-dom';

const Navbar = () => {

    // useState expanded and setExpanded onClick
    // circle back putas
  return (
      <React.Fragment>
        <nav className="navbar navbar-expand-md navbar-dark sticky-top bg-dark">
            <Link
                to="/" 
                className="navbar-brand">
                <img src={Questions} alt="react" className="img-fluid logo" height="99.66px" width="200px"/>
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
                            to="/activities" 
                            className={
                                window.location.pathname === "activities"
                                ? "nav-link active"
                                : "nav-link"
                            }>
                            Activities
                        </Link>
                    </li>
                    &nbsp;|&nbsp;
                    <li className="nav-item">
                        <Link
                            to="/assignments" 
                            className={
                                window.location.pathname === "/assignments"
                                    ? "nav-link active"
                                    : "nav-link" 
                            }>
                            Assignments
                        </Link>
                    </li>
                    &nbsp;|&nbsp;
                    <li className="nav-item">
                        <Link
                            to="/grades" 
                            className={
                                window.location.pathname === "/grades"
                                ? "nav-link active"
                                : "nav-link"
                            }>
                            Grades
                        </Link>
                    </li>
                    &nbsp;|&nbsp;
                    <li className="nav-item">
                        <Link
                            to="/login" 
                            className={
                                window.location.pathname === "/login"
                                ? "nav-link active"
                                : "nav-link"
                            }>
                            Login
                        </Link>
                    </li>
                    &nbsp;|&nbsp;
                    <li className="nav-item">
                        <Link
                            to="/register" 
                            className={
                                window.location.pathname === "/register"
                                ? "nav-link active"
                                : "nav-link"
                            }>
                            Register
                        </Link>
                    </li>
                    &nbsp;|&nbsp;
                    <li className="nav-item">
                        <Link
                            to="/syllabus" 
                            className={
                                window.location.pathname === "/syllabus"
                                ? "nav-link active"
                                : "nav-link"
                            }>
                            Syllabus
                        </Link>
                    </li>
                </ul>
           </div>
    </nav>
    </React.Fragment>
  )
}

export default Navbar;