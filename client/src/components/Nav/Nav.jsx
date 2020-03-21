import React from "react";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="/">
        Home
      </a>
      <a className="navbar-brand" href="/assignments">
        Assignments
      </a>
      <a className="navbar-brand" href="/grades">
        Grades
      </a>
      <a className="navbar-brand" href="/login">
        Login
      </a>
      <a className="navbar-brand" href="/register">
        Register
      </a>
      <a className="navbar-brand" href="/syllabus">
        Syllabus
      </a>
    </nav>
  )
  }
  export default Nav;