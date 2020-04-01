import React from 'react';
import Container from '../components/Container/Container.jsx';
import Card from '../components/Card';

const Dashboard= () => {
    return (
        <Container fluid>
            <Card 
            title={<i>Login Here</i>} 
            size={'small'}
            color={'blue-grey'} 
            customclass={'darken-2 center'}
            action={<button type="submit" onClick={handleFormSubmit}disabled={!(loginForm.email && loginForm.password)} className="waves-effect waves-light btn-large">LOGIN</button>}
            bottomLink={<p>Don't have an account? <a href="/register">Register Here!</a></p>}
            ></Card>
        </Container>
    )
}

export default Dashboard;