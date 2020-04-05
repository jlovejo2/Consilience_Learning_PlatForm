import React from "react";
import "./Navbar.css";
import Questions from "../../images/feynman.jpg";
import { Link } from "react-router-dom";

const Navbar = () => {
  // useState expanded and setExpanded onClick
  // circle back putas
  return (
    <React.Fragment>
      <div className="navbar-fixed">
        <nav
          className="nav-wrapper navbar-dark grey darken-3" /*"navbar navbar-expand-md navbar-dark sticky-top bg-dark"*/
        >
          <Link to="/" className="brand-logo left" /*"navbar-brand"*/>
            <img
              src={Questions}
              alt="react"
              className="img-fluid logo"
              height="64px"
              width="128px"
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
              <Link to="/dashboardTeacher">DashBTeacher</Link>
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
              <Link to="/dashboardStudent">DashBStudent</Link>
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
              <Link to="/syllabus">Syllabus</Link>
            </li>
          </ul>
        </nav>
      </div>
    </React.Fragment>
  );
};

export default Navbar;
