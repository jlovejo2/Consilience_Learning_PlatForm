import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import Home from './pages/home.jsx';
import Activities from './pages/activities.jsx';
import Assignments from './pages/assignments.jsx';
import Grades from './pages/grades.jsx';
import Login from './pages/login.jsx';
import Register from './pages/register.jsx';
import Syllabus from './pages/syllabus.jsx';
import Footer from './components/Footer/Footer.jsx';

const App = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <React.Fragment>
                <Route exact path = "/" component={Home} />
                <Route exact path = "/activities" component={Activities} />
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