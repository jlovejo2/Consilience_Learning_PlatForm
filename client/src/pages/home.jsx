import React /*, { useState, useEffect }*/ from "react";
import Container from "../components/Container/Container.jsx";
import Jumbotron from "../components/Jumbotron/Jumbotron.jsx";

const Home = () => {
  return (
    <Container fluid>
      <Jumbotron
        missionStatement={
          'Welcome to Consilience. Consilience is the principle that evidence from independent, unrelated sources can "converge" on strong conclusions.  This platform exists for a user to either teach, be taught, or both.  Here a user can register as a "Teacher" or "Student."  If you do not want to register just yet click on the search icon in navbar and browse our classes.  One can never learn to much!'
        }
        href="/login"
      />
    </Container>
  );
};

export default Home;
