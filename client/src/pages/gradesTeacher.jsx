import React from 'react';
import Container from '../components/Container/Container.jsx'
import Dashboard from '../components/Grades/TeacherDashboard'

// creating a gradebook that is student (n) responsive
// similar to a relational database (x, y col/row)
// perhaps utilize a drop box and/or tabs to 
// toggle various assigments
// always display a cumulative grade
// incorporate charts.js npm to model 
// bell curve distribution 

const Grades = () => {
    return (
        <Container fluid>
            <Dashboard/>
        </Container>
    )
}

export default Grades;