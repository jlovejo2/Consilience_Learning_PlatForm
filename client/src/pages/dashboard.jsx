import React, { useState } from 'react';
import Container from '../components/Container/Container.jsx';
import ClassCard from '../components/ClassCard/ClassCard';
// import Paper from '@material-ui/core/Paper';
// import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import {Button, Input, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
// import NavigationIcon from '@material-ui/icons/Navigation';


const Dashboard = () => {

    const [openDialog, setOpenDialog] = useState(false);
    const [newClassFromObj, setNewClassFormObj] = useState({});


    function handleDialogClose(event) {
        setOpenDialog(false);
    }

    function handleCreateClass() {
        setOpenDialog(true);
    }

    function handleDailogSubmit(event) {
        console.log(event.target.value);
    }

    return (
        <Container fluid>
            <p>Welcome to the classroom dashboard. To get started click the below button to add a class</p>
            <Fab size="small" color="secondary" aria-label="add">
                <AddIcon onClick={handleCreateClass} />
            </Fab>
            <ClassCard></ClassCard>


            {/* 
            
                add a modal with a form in it that pops-up everytime you click the plus button.  This form can use material UI textfields, inputs and buttons
               When they hit submit the information from that form will be sent to the database.  upon confirmation that it was sent to the database a classroom card will be generated
                
                */}
            <Dialog
                open={openDialog}
                onClose={handleDialogClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Add a Class</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please Enter your classroom Information below ...
                    </DialogContentText>
                    <label>
                        Course Title:
                    <Input
                    autoFocus
                    disableUnderline
                    margin='dense'
                    id='title'
                    type='text'
                    fullWidth
                    />
                    </label>
                    <label>
                        Course Discipline:
                    <Input
                    autoFocus
                    disableUnderline
                    margin='dense'
                    id='discipline'
                    type='text'
                    fullWidth
                    />
                    </label>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="description"
                        label='Course Description'
                        type="text"
                        variant="outlined"
                        multiline
                        rowsMax='4'
                        fullWidth
                    />
                    <DialogActions>
                        <Button onClick={handleDialogClose} color="primary">
                            Cancel
                    </Button>
                        <Button onClick={handleDailogSubmit} color="primary" type='submit'>
                            Submit
                    </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>

        </Container>
    )
}

export default Dashboard;