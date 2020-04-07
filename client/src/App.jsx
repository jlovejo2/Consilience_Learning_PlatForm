import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import Home from './pages/home.jsx';
import Activities from './pages/activitiesTeacher.jsx';
import Assignments from './pages/assignmentsTeacher.jsx';
import dashboardTeacher from './pages/dashboardTeacher.jsx';
import dashboardStudent from './pages/dashboardStudent'
import Grades from './pages/gradesTeacher.jsx';
import Login from './pages/login.jsx';
import Register from './components/RegisterForm/Register.jsx';
import Syllabus from './pages/syllabusTeacher.jsx';
import Classroom from './pages/Classroom.jsx';
import Footer from './components/Footer/Footer.jsx';
import Wrapper from './components/Wrapper/Wrapper.jsx'

// creating ConfigContext for user authenticated vs not authenticated UI
export const ConfigContext = React.createContext();

const App = () => {

    return (
        <BrowserRouter>
            <Navbar />
            <Wrapper>
            <React.Fragment>
                <Route exact path = "/" component={Home} />
                <Route exact path = "/activities" component={Activities} />
                <Route exact path = "/assignments" component={Assignments} />
                <Route exact path = "/dashboardTeacher" component={dashboardTeacher} />
                <Route exact path = "/dashboardStudent" component ={dashboardStudent} />
                <Route exact path = "/grades" component={Grades} />
                <Route exact path = "/login" component={Login} />
                <Route exact path = "/register" component={Register} />
                <Route exact path = "/syllabus" component={Syllabus} />
                <Route exact path = "/classrooms" component={Classroom} />
            </React.Fragment>
            </Wrapper>
            <Footer />
        </BrowserRouter>
    )
}

export default App;