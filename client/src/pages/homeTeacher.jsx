import React from 'react';
import Container from '../components/Container/Container.jsx'
import Jumbotron from '../components/Jumbotron/Jumbotron.jsx'

const Home = () => {
    return (
        <Container fluid>
            <div className="text-white">HOME</div>
            <Jumbotron />
        </Container>
    )
}

export default Home;