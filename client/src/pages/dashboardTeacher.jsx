import React, { useState, useEffect } from 'react';
import Container from '../components/Container/Container.jsx';
import ClassCard from '../components/ClassCard/ClassCard';
// import Paper from '@material-ui/core/Paper';
// import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { Button, Input, TextField } from '@material-ui/core';
import { Menu, MenuItem } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import API from '../utils/API';
// import NavigationIcon from '@material-ui/icons/Navigation';

const DashBoardTeacher = () => {

    const [openDialog, setOpenDialog] = useState(false);
    const [newClassFormObj, setNewClassFormObj] = useState({});
    const [classesArr, setClassesArr] = useState([]);
    const [menuAnchor, setMenuAnchor] = useState(null);

    useEffect(() => {
        // eslint-disable-next-line
        loadClasses()
        // eslint-disable-next-line
    }, [newClassFormObj])

    //This function calls the backend and loads all the classes in the database onto the dashboard page
    function loadClasses() {
        API.getClasses()
            .then(resp => {
                // console.log(resp)
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

    function handleMenuClick(event) {
        setMenuAnchor(event.target);
    }

    function handleMenuClose() {
        setMenuAnchor(null);
    }
    //This function is called by the input tags and textarea tags on the dailog form for the add a class button
    //It places the content the user is typing into those tags into the newClassFormObj so that it can be submitted upon button click
    function handleInputChange(event) {
        console.log(event.target.name);
        const { name, value } = event.target
        setNewClassFormObj({ ...newClassFormObj, [name]: value })
    }

    //This function is called by the submit button on the create class dialog form.  It takes all the information from the class dialog form that 
    //has been updated and placed into newClassFormObj by onChange and submits it to the backend through the API.addclass() function
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
            <Grid align='center'>
                <p>Welcome to the classroom dashboard. To get started click the "+" button to add a class</p>

                <Fab size="small" color="secondary" aria-label="add">
                    <AddIcon onClick={handleCreateClass} />
                </Fab>
            </Grid>
            <Grid
                container
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
                                md={4}
                                align="center"
                            >
                                <ClassCard
                                    key={index}
                                    title={value.courseTitle}
                                    subheader={value.courseDiscipline}
                                    paragraph1={value.courseDescription}
                                    paragraph2=''
                                    image=''
                                    imageTitle=''
                                    imageCaption=''
                                    settingsButton={handleMenuClick}
                                >
                                </ClassCard>
                            </Grid>
                        )
                    })
                        : <p>No classes Found</p>
                }
            </Grid>
            <Menu
                id="simple-menu"
                anchorEl={menuAnchor}
                keepMounted
                open={Boolean(menuAnchor)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleMenuClose}>Add Image to Class</MenuItem>
                <MenuItem onClick={handleMenuClose}>Change Title</MenuItem>
                <MenuItem onClick={handleMenuClose}>Update Description</MenuItem>
            </Menu>
            {/* --------------------------------------------------------------------------------------------- */}
            {/*<________________________ Below This Line is Dialog Form for adding class __________________>  */}
            {/* --------------------------------------------------------------------------------------------- */}
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

export default DashBoardTeacher;