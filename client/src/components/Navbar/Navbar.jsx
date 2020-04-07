import React from "react";
import "./Navbar.css";
import LogoMin from "../../images/logoMin.png";
import { Link } from "react-router-dom";
// import { Fade } from '@material-ui/core';

const Navbar = () => {
  // useState expanded and setExpanded onClick
  // circle back putas
  return (
    <React.Fragment>
      <div className="navbar-fixed col-md-8">
        <nav
          className="nav-wrapper" /*"navbar navbar-expand-md navbar-dark sticky-top"*/
        >
          <Link to="/" className="brand-logo left" /*"navbar-brand"*/>
            <img
              src={LogoMin}
              alt="react"
              className="img-fluid logo"
              height="67px"
              width="220px"
            />
          </Link>
          {/* The below a tag is the code that renders the hamburger menu when the size of the screen is minimized */}
          <a
            href="/"
            data-target="mobile-demo"
            className="sidenav-trigger right hide-on-med-and-up"
          >
            <i className="material-icons">menu</i>
          </a>
          <ul className="navbar-nav right hide-on-sml-and-down" /*"navbar-nav"*/>
            <li id="li-nav"
              className={
                window.location.pathname === "/" ||
                window.location.pathname === "/home"
                  ? "active"
                  : ""
              }
            >
              <Link to="/">Home</Link>
            </li>
            <li
              className={
                window.location.pathname === "/activities" ? "active" : ""
              }
            >
              <Link to="/activities">Activities</Link>
            </li>
            <li
              className={`nav-item
                            ${
                              window.location.pathname === "/assignments"
                                ? "active"
                                : ""
                            }
                            `}
            >
              <Link to="/assignments">Assignments</Link>
            </li>
            <li
              className={`nav-item
                            ${
                              window.location.pathname === "/assignmentsTeacher"
                                ? "active"
                                : ""
                            }
                            `}
            >
              <Link to="/dashboardTeacher">Teacher</Link>
            </li>
            <li
              className={`nav-item
                            ${
                              window.location.pathname === "/assignmentsStudent"
                                ? "active"
                                : ""
                            }
                            `}
            >
              <Link to="/dashboardStudent">Student</Link>
            </li>
            <li
              className={window.location.pathname === "/grades" ? "active" : ""}
            >
              <Link to="/grades">Grades</Link>
            </li>
            <li
              className={
                window.location.pathname === "/syllabus" ? "active" : ""
              }
            >
              <Link to="/syllabus">Syllabi</Link>
            </li>
          </ul>
        </nav>
      </div>
    </React.Fragment>
  );
};

export default Navbar;
