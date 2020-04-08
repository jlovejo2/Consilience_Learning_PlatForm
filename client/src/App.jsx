import React, { useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import Home from './pages/home.jsx';
import Assignments from './pages/assignments.jsx';
import dashboardTeacher from './pages/dashboardTeacher.jsx';
import dashboardStudent from './pages/dashboardStudent'
import Grades from './pages/gradesTeacher.jsx';
import Login from './pages/login.jsx';
import Search from './pages/search.jsx';
// import Register from './components/RegisterForm/Register.jsx';
import Syllabus from './pages/syllabusTeacher.jsx';
import Classroom from './pages/Classroom.jsx';
import Footer from './components/Footer/Footer.jsx';
import Wrapper from './components/Wrapper/Wrapper.jsx'
// import API from './utils/API.js';
import RootContext from './utils/RootContext';

// // creating ConfigContext for user authenticated vs not authenticated UI
// export const ConfigContext = React.createContext();


const App = () => {

    const [userType, setUserType ] = useState('')
    const [userID, setUserID ] = useState('')
    const [classID, setClassID ] = useState('')

    return (
        <BrowserRouter>
            <RootContext.Provider value={{ userType, setUserType, userID, setUserID, classID, setClassID }}>
                <Navbar />
                <Wrapper>
                    <React.Fragment>
                        <Route exact path="/search" component={Search} />
                        <Route exact path="/assignments" component={Assignments} />
                        <Route exact path="/dashboardTeacher" component={dashboardTeacher} />
                        <Route exact path="/dashboardStudent" component={dashboardStudent} />
                        <Route exact path="/grades" component={Grades} />
                        {/* <Route exact path="/register" component={Register} /> */}
                        <Route exact path="/syllabus" component={Syllabus} />
                        <Route exact path="/classrooms" component={Classroom} />
                        <Route exact path="/" component={Home} />
                        <Route path="/login">
                            <Login/>
                        </Route>
                    </React.Fragment>
                </Wrapper>
                <Footer />
            </RootContext.Provider>
        </BrowserRouter>
    )
};


export default App;