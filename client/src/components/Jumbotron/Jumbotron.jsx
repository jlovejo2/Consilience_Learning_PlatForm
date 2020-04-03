
import React from "react";
import { MDBJumbotron, MDBBtn, MDBContainer, MDBCardTitle} from "mdbreact";
import './Jumbotron.css'

const Jumbotron = () => {
  return (
    <MDBContainer className='jumbocontain col-md-6'>
          <MDBJumbotron className="jumboimg" style={{ backgroundImage: `url(https://drive.google.com/uc?id=1ApvW1VY_lYNnefiSIPMhPBCraHtkUs2d)` }}>
                <MDBCardTitle className="jumbotitle col-md-6 mx-auto">Consilience</MDBCardTitle>
                <p className="jumbotext">Keeping you connected with all your classroom needs.</p>
                <MDBBtn className="btn-center"> Login/Signup</MDBBtn>
          </MDBJumbotron>
    </MDBContainer>
  )
}

export default Jumbotron;