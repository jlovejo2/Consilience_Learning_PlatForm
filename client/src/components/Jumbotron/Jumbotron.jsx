import React from "react";
import { MDBJumbotron, MDBBtn, MDBContainer, MDBCardTitle } from "mdbreact";
import "./Jumbotron.css";

const Jumbotron = (props) => {
  return (
    <MDBContainer className="jumbocontain">
      <MDBJumbotron
        className="jumboimg animated bounceInDown"
        style={{
          backgroundImage: `url(https://i.ytimg.com/vi/Gg_9Cc3NKK8/maxresdefault.jpg)`,
        }}
      >
        <MDBCardTitle className="jumbotitle">Consilience</MDBCardTitle>
        <p className="jumbotext">{props.missionStatement}</p>
        <MDBBtn className="btn-grad center" href={props.href}>
          {" "}
          Login/Register
        </MDBBtn>
      </MDBJumbotron>
    </MDBContainer>
  );
};

export default Jumbotron;
