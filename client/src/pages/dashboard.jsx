import React, { useState, useEffect } from 'react';
import Container from '../components/Container/Container.jsx';
import ClassCard from '../components/ClassCard/ClassCard';
// import Paper from '@material-ui/core/Paper';
// import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { Button, Input, TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import API from '../utils/API';
// import NavigationIcon from '@material-ui/icons/Navigation';


const Dashboard = () => {

    const [openDialog, setOpenDialog] = useState(false);
    const [newClassFormObj, setNewClassFormObj] = useState({});
    const [classesArr, setClassesArr] = useState([])

    useEffect(() => {
        loadClasses()
    }, [newClassFormObj])

    function loadClasses() {
        API.getClasses()
            .then(resp => {
                console.log(resp)
                setClassesArr(resp.data);
                // console.log(classesArr);
            })
            .catch(err => console.log(err))
    }

    function handleDialogClose() {
        setOpenDialog(false);
    }

    function handleCreateClass() {
        setOpenDialog(true);
    }

    function handleInputChange(event) {
        console.log(event.target.name);
        const { name, value } = event.target
        setNewClassFormObj({ ...newClassFormObj, [name]: value })
    }

    function handleDailogSubmit() {
        //This is being done manually because user model and authentication is still being worked on
        const currentUserID = '077432'

        newClassFormObj.userID = currentUserID

        console.log(newClassFormObj);
        API.addClass(newClassFormObj)
            .then(resp => {
                console.log("Class added successfully")
                loadClasses()
                handleDialogClose()
            })
            .catch(err => console.log(err))
    }

    return (
        <Container fluid>
            <p>Welcome to the classroom dashboard. To get started click the below button to add a class</p>
            <Fab size="small" color="secondary" aria-label="add">
                <AddIcon onClick={handleCreateClass} />
            </Fab>
            <Grid 
            container
            //  item 
            spacing={3} 
            // justify="space-around"
            // alignItems="center"
            // direction="row" 
            >
                {
                    classesArr.length > 0 ? classesArr.map((value, index) => {
                        console.log(value);
                        return (
                            <Grid
                                key={index}
                                item
                                md = {4} 
                            >
                                <ClassCard
                                    key={index}
                                    title={value.courseTitle}
                                    subheader={value.courseDiscipline}
                                    paragraph1={value.courseDescription}
                                >
                                </ClassCard>
                            </Grid>
                        )
                    })
                        : <p>No classes Found</p>
                }
            </Grid>
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
                            name='title'
                            type='text'
                            fullWidth
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Course Discipline:
                    <Input
                            autoFocus
                            disableUnderline
                            margin='dense'
                            id='discipline'
                            name='discipline'
                            type='text'
                            fullWidth
                            onChange={handleInputChange}
                        />
                    </label>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="description"
                        name='description'
                        label='Course Description'
                        type="text"
                        variant="outlined"
                        multiline
                        rowsMax='4'
                        fullWidth
                        onChange={handleInputChange}
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