import React from 'react';
import Container from '../components/Container/Container.jsx';
import ClassCard from '../components/ClassCard/ClassCard';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import NavigationIcon from '@material-ui/icons/Navigation';


const Dashboard = () => {

    

    function handleCreateClass(event) {

    }

    return (
        <Container fluid>
            <p>Welcome to the classroom dashboard. To get started click the below button to add a class</p>
            <Fab size="small" color="secondary" aria-label="add">
                <AddIcon onClick={handleCreateClass} />
            </Fab>
            <ClassCard></ClassCard>

        </Container>
    )
}

export default Dashboard;