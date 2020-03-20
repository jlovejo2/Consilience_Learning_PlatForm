import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Nav from './components/Nav/Nav.jsx';
import Home from './components/Home/Home.jsx';
import Assignments from './components/Assignments/Assignments.jsx';
import Grades from './components/Grades/Grades.jsx';
import Login from './components/Login/Login.jsx';
import Register from './components/Register/Register.jsx';
import Syllabus from './components/Syllabus/Syllabus.jsx';
import Footer from './components/Footer/Footer.jsx'

const App = () => {
    return (
        <BrowserRouter>
            <Nav />
            <React.Fragment>
                <Route exact path = "/" component={Home} />
                <Route exact path = "/assignments" component={Assignments} />
                <Route exact path = "/grades" component={Grades} />
                <Route exact path = "/login" component={Login} />
                <Route exact path = "/register" component={Register} />
                <Route exact path = "/syllabus" component={Syllabus} />
            </React.Fragment>
            <Footer />
        </BrowserRouter>
    )
}
export default App;