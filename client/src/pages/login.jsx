import React from 'react';
import Container from '../components/Container/Container.jsx'
import Card from '../components/Card/Card.jsx';
import { Form, Input} from '../components/LoginForm/LoginForm.jsx';

const Login = () => {
    return (
        <Container fluid>
            {/* <div className="text-white">Login</div> */}
        <div className='row valign-wrapper'>
            <div className='col s2'></div>
            <div className='col s8 center-align m6'>
            <Card 
            title={<i>Login Here</i>} 
            color={'blue-grey'} 
            customClass={'darken-1 center'}
            action={<button type="submit" className="waves-effect waves-light btn-large">LOGIN</button>}
            bottomLink={<p>Don't have an account? <a href="/users/register">Register Here!</a></p>}
            >
                <Form>
                    <Input
                    name='email'
                    label='Email :'
                    placeholder='Please enter your email address'
                    requiredType='email'
                    customClass='validate center' />
                    <Input
                    name='password'
                    label='Password :'
                    placeholder='Please enter your password'
                    requiredType='password'
                    customClass='validate center' />
                </Form>
            </Card>
            </div>
            <div className='col s2'></div>
        </div>   
        </Container>

    )
}

export default Login;