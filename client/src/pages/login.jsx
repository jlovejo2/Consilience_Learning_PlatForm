import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm/Register.jsx';
import Container from '../components/Container/Container.jsx'
import Card from '../components/Card/Card.jsx';
import { Form, Input } from '../components/LoginForm/LoginForm.jsx';
import API from '../utils/API';
import RootContext from '../utils/RootContext';
import '../index.css';
import './pageSty;e/login.css'

const Login = () => {

    const { userType, setUserType, userID, setUserID } = useContext(RootContext)
    const [loginForm, setLoginForm] = useState({})
    const [registerForm, setRegisterForm] = useState({})
    const [openDialog, setOpenDialog] = useState(false);
    const [redirectUser, setRedirectUser] = useState(false);
  
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
        console.log(registerForm);
        console.log('submitting register');
        event.preventDefault();
        if (registerForm.email && registerForm.password && registerForm.type) {
            console.log('Register looks good so far')
            API.userRegister(registerForm)
                .then(resp => {
                    console.log(resp)
                    setOpenDialog(false)
                    
                })
                .catch(err => console.log(err))
        } else {
            console.log('else');
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
                    console.log(res.data)
                    const userInfo = res.data.user
                    setUserID(userInfo.ID)
                    setUserType(userInfo.type)
                    // double commented code out of commission
                    // because server-generated proxy-backed
                    // cookies were preferentially utilized
                    // //   if (res.data) setShow(true);
                    // // localStorage.setItem('token', userInfo.token);
                    // // console.log(userInfo.token)
                    
                    if (userInfo.type === 'Teacher') {
                        console.log('teacher')
                        setRedirectUser('/dashboardTeacher')
                    } else if (userInfo.type === 'Student') {
                        console.log('student')
                        setRedirectUser('/dashboardStudent')
                    } else {
                        console.log(userInfo.type)
                        console.log('something is weird')
                    }
                })
                .catch(err => console.log(err))
        }
    }

    if (redirectUser) {

        console.log(userType);
        console.log(userID);
       
       return <Redirect to={redirectUser}
        />
    }

    return (
        <Container fluid>
            {/* <div className="text-white">Login</div> */}
            <div className='row valign-wrapper'>
                <div className='col s4'></div>
                <div className='loginform col s6 center-align'>
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
                                        className="inputLogin"
                                        size='s12'
                                        name='email'
                                        label='Email :'
                                        required='email'
                                        customclass='validate center'
                                        onChange={handleInputChange} />
                                    <Input
                                        className="inputLogin"
                                        size='s12'
                                        name='password'
                                        label='Password :'
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
                radioValue={registerForm.type}
                handleInput={handleRegisterInputChange}
                submitRegister={handleRegisterSubmit} />

        </Container>
    )
}

export default Login;