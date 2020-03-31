import React, { useState } from 'react';
import Container from '../components/Container/Container.jsx'
import Card from '../components/Card/Card.jsx';
import { Form, Input} from '../components/LoginForm/LoginForm.jsx';
import API from '../utils/API';


const Login = () => {

    const[loginForm, setLoginForm] = useState({})

    function handleInputChange(event) {
        console.log(event.target.name);
        const { name, value } = event.target
        setLoginForm({ ...loginForm, [name]: value })
        console.log(loginForm);
      }

    function handleFormSubmit(event) {
        event.preventDefault();
    if (loginForm.email && loginForm.password) {
      console.log('contains email & password')
      API.loginUser({
        email: loginForm.email,
        name: loginForm.password,
      })
        .then(res => {
            console.log(res);
        //   if (res.data) setShow(true);
        })
        .catch(err => console.log(err))
    }
    }


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
            customclass={'darken-1 center'}
            action={<button type="submit" onClick={handleFormSubmit}disabled={!(loginForm.email && loginForm.password)} className="waves-effect waves-light btn-large">LOGIN</button>}
            bottomLink={<p>Don't have an account? <a href="/register">Register Here!</a></p>}
            >
            <div className='row'>
                <Form size={'col s12'}>
                    <div className='row'>
                    <Input
                    size='s12'
                    name='email'
                    label='Email :'
                    placeholder='Please enter your email address'
                    required='email'
                    customclass='validate center'
                    onChange={handleInputChange} />
                                        
                    <Input
                    size='s12'
                    name='password'
                    label='Password :'
                    placeholder='Please enter your password'
                    type='password'
                    required='password'
                    customclass='validate center'
                    onChange={handleInputChange} />
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