import React, { useState } from 'react';
import RegisterForm from '../components/RegisterForm/register.jsx';
import Container from '../components/Container/Container.jsx'
import Card from '../components/Card/Card.jsx';
import { Form, Input } from '../components/LoginForm/LoginForm.jsx';
import API from '../utils/API';

import Modal from '@material-ui/core/Modal';

const Login = () => {

    const [loginForm, setLoginForm] = useState({})
    const [registerForm, setRegisterForm] = useState({})
    const [openDialog, setOpenDialog] = useState(false);

    const handleRegisterOpen = () => {
        setOpenDialog(true);
    };

    const handleRegisterClose = () => {
        setOpenDialog(false);
    };

    function handleInputChange(event) {
        const { name, value } = event.target
        setLoginForm({ ...loginForm, [name]: value })
    }

    function handleRegisterInputChange(event) {
        const { name, value } = event.target
        setRegisterForm({ ...registerForm, [name]: value })
    }

    function handleRegisterSubmit(event) {
        event.preventDefault();
        if (registerForm.email && registerForm.password && registerForm.userType) {
            console.log('Register looks good so far')
            API.userRegister(registerForm)
                .then(resp => {
                    console.log(resp)
                   setOpenDialog(false) 
                })
                .catch(err => console.log(err))
        }
    }

    function handleFormSubmit(event) {
        event.preventDefault();
        if (loginForm.email && loginForm.password) {
            console.log('contains email & password')
            API.userLogin({
                username: loginForm.email,
                password: loginForm.password,
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
                        action={<button type="submit" onClick={handleFormSubmit} disabled={!(loginForm.email && loginForm.password)} className="waves-effect waves-light btn-large">LOGIN</button>}
                        bottomLink={<p>Don't have an account? <button className='linkButton' onClick={handleRegisterOpen} >Register Here!</button></p>}
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
            <RegisterForm
                open={openDialog}
                close={handleRegisterClose}
                radioValue={loginForm.userType}
                handleInput={handleRegisterInputChange}
                submitRegister={handleRegisterSubmit} />

        </Container>
    )
}

export default Login;