import React from 'react';
import Container from '../components/Container/Container.jsx'
import Card from '../components/Card/Card.jsx';
import { Form, Input} from '../components/LoginForm/LoginForm.jsx';

const Login = () => {
    return (
        <Container fluid>
            {/* <div className="text-white">Login</div> */}
        <div className='row valign-wrapper'>
            <div className='col s4'></div>
            <div className='col s6 center-align'>
            <Card 
            title={<i>Login Here</i>} 
            size={'medium'}
            color={'blue-grey'} 
            customClass={'darken-1 center'}
            action={<button type="submit" className="waves-effect waves-light btn-large">LOGIN</button>}
            bottomLink={<p>Don't have an account? <a href="/users/register">Register Here!</a></p>}
            >
            <div class='row'>
                <Form size={'col s12'}>
                    <div class='row'>
                    <Input
                    size='s12'
                    name='email'
                    label='Email :'
                    placeholder='Please enter your email address'
                    requiredType='email'
                    customClass='validate center' />
                                        
                    <Input
                    size='s12'
                    name='password'
                    label='Password :'
                    placeholder='Please enter your password'
                    requiredType='password'
                    customClass='validate center' />
                    </div>
                </Form>
                </div>
            </Card>
            </div>
            <div className='col s4'></div>
        </div>   
        </Container>

    )
}

export default Login;