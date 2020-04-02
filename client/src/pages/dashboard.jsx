import React, { useState, useEffect } from 'react';
import Container from '../components/Container/Container.jsx';
import ClassCard from '../components/ClassCard/ClassCard';
// import Paper from '@material-ui/core/Paper';
// import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import {Button, Input, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import API from '../utils/API';
// import NavigationIcon from '@material-ui/icons/Navigation';


const Dashboard = () => {

    const [openDialog, setOpenDialog] = useState(false);
    const [newClassFormObj, setNewClassFormObj] = useState({});
    const [classesArr, setClassesArr] = useState([])

    useEffect(() => {
        loadClasses()
    }, [])

    function loadClasses() {
        API.getClasses()
            .then(resp => {
                console.log(resp)
                setClassesArr(resp.data);
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
        console.log(newClassFormObj);
    }

    return (
        <Container fluid>
            <p>Welcome to the classroom dashboard. To get started click the below button to add a class</p>
            <Fab size="small" color="secondary" aria-label="add">
                <AddIcon onClick={handleCreateClass} />
            </Fab>
            { classesArr.length > 0 ? classesArr.map( (index , value) => {
                return ( <ClassCard
                key={index}

                    >

                </ClassCard> 
                ) 
            })
             : <p>No classes Found</p>
            }
         
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