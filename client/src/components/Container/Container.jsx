import React from "react";

// Exporting the Container, Row, and Col components from this file

// This Container component allows us to use a bootstrap container without worrying about class names
function Container({ fluid, children }) {
  return <div style={{ margin: "2rem 3rem 5rem 3rem", padding: "3px 2px 3px 2px" }} className={`container${fluid ? "-fluid" : ""}`}>{children}</div>;
}

export default Container;
