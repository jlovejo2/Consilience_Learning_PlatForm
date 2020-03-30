import React from "react";
import './Navbar.css';
import Questions from '../../images/feynman.jpg'
import { Link } from 'react-router-dom';

const Navbar = () => {

    // useState expanded and setExpanded onClick
    // circle back putas
    return (
        <React.Fragment>
            <div className='navbar-fixed'>
                <nav className='nav-wrapper navbar-dark grey darken-3' /*"navbar navbar-expand-md navbar-dark sticky-top bg-dark"*/ >
                    <Link
                        to="/"
                        className='brand-logo left' /*"navbar-brand"*/>
                        <img src={Questions} alt="react" className="img-fluid logo" height="99.66px" width="200px" />
                    </Link>
                    {/* The below a tag is the code that renders the hamburger menu when the size of the screen is minimized */}
                    <a href="#" data-target="mobile-demo" className="sidenav-trigger right"><i class="material-icons">menu</i></a>
                    <ul className='right hide-on-med-and-down'/*"navbar-nav"*/>
                        <li className={
                            window.location.pathname === "/" || window.location.pathname === "/home"
                                ? "active"
                                : ""
                        }>
                            <Link
                                to="/"
                            >
                                Home
                                </Link>
                        </li>
                            &nbsp;|&nbsp;
                            <li className={
                            window.location.pathname === "/activities"
                                ? "active"
                                : ""
                        }>
                            <Link
                                to="/activities"
                            >
                                Activities
                                </Link>
                        </li>
                            &nbsp;|&nbsp;
                            <li className={`nav-item
                            ${window.location.pathname === "/assignments"
                                ? "active"
                                : ""}
                            `}>
                            <Link
                                to="/assignments"
                            >
                                Assignments
                                </Link>
                        </li>
                            &nbsp;|&nbsp;
                            <li className={
                            window.location.pathname === "/grades"
                                ? "active"
                                : ""
                        }>
                            <Link
                                to="/grades"
                            >
                                Grades
                                </Link>
                        </li>
                            &nbsp;|&nbsp;
                            <li className={
                            window.location.pathname === "/login"
                                ? "active"
                                : ""
                        }>
                            <Link
                                to="/login"
                            >
                                Login
                                </Link>
                        </li>
                            &nbsp;|&nbsp;
                            <li className={
                            window.location.pathname === "/register"
                                ? "active"
                                : ""
                        }>
                            <Link
                                to="/register"
                            >
                                Register
                                </Link>
                        </li>
                            &nbsp;|&nbsp;
                            <li className={
                            window.location.pathname === "/syllabus"
                                ? "active"
                                : ""
                        }>
                            <Link
                                to="/syllabus"
                            >
                                Syllabus
                                </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </React.Fragment>
    )
}

export default Navbar;