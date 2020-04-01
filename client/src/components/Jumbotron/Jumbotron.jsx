
import React from "react";
import { MDBJumbotron, MDBBtn, MDBContainer, MDBCardTitle} from "mdbreact";
import './Jumbotron.css'

const Jumbotron = () => {
  return (
    <MDBContainer className='jumbocontain mx-auto col-md-8 py-5'>
          <MDBJumbotron className="jumboimg" style={{ backgroundImage: `url(https://drive.google.com/uc?id=1ApvW1VY_lYNnefiSIPMhPBCraHtkUs2d)` }}>
                <MDBCardTitle className="jumbotitle col-md-8 mx-auto">Consilience</MDBCardTitle>
                <p className="jumbotext">We are Consilience, a hub to keep you connected with all of your classroom needs.</p>
                <MDBBtn className="btn-center"> Login/Signup</MDBBtn>
          </MDBJumbotron>
    </MDBContainer>
  )
}

export default Jumbotron;