import React from "react";

// Exporting the Container, Row, and Col components from this file

// This Container component allows us to use a bootstrap container without worrying about class names
function Container({ fluid, children }) {
  return (
    <div
      style={{ margin: "1rem 4rem 1rem 4rem", padding: "20px 40px 20px 40px" }}
      className={`container${fluid ? "-fluid" : ""}`}
    >
      {children}
    </div>
  );
}

export default Container;
