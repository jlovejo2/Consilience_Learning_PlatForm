import React, { useState, useEffect } from "react";
// import RootContext from "../utils/RootContext";
import API from "../utils/API";
import custFunc from "../utils/customFunctions";
//Importing components from component folder
import Container from "../components/Container/Container.jsx";
import TeacherClassCard from "../components/ClassCard/TeacherClassCard";
import StudentClassCard from '../components/ClassCard/StudentClassCard'

//Importing components and icons from material-ui
// import Paper from '@material-ui/core/Paper';
import Card from "@material-ui/core/Card";
import { styled } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@material-ui/core";
import { Button, Input, TextField } from "@material-ui/core";
import { Menu, MenuItem } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
// import SvgIcon from '@material-ui/core/SvgIcon';
// import NavigationIcon from '@material-ui/icons/Navigation';
// import Paper from '@material-ui/core/Paper';
// import { makeStyles } from '@material-ui/core/styles';

const MyCard = styled(Card)({
    background: "transparent",
    margin: "0",
    // align: 'stretch',
    alignItems: 'center',
});

const DashBoardTeacher = (props) => {

    const [openDialog, setOpenDialog] = useState(false);
    const [newClassFormObj, setNewClassFormObj] = useState({});
    const [classesArr, setClassesArr] = useState([]);
    const [menuAnchor, setMenuAnchor] = useState(null);
    const [selectedFile, setSelectedFile] = useState({});
    const [currentClass, setCurrentClass] = useState('');
    const [userType, setUserType] = useState("");
    const [ userID, setUserID] = useState("")
    

    function getAndVerifyUserInfo() {
         API.readAndVerifyCookie()
            .then((resp) => {
            console.log("cookie call resp: ", resp)
            console.log("dropping the load: ", resp.data.payload)
            setUserType(resp.data.payload.type)
            setUserID(resp.data.payload._id)
            console.log(userType)
            console.log(userID)
            //load the classes after the userID And userType are received from token
            })
            .catch (error => {
            console.log(error)
            })
    }


    useEffect(() => {

        getAndVerifyUserInfo()
        // getAndVerifyUserInfo()
        // console.log(userType);

        loadClasses()
        console.log(userType)
        console.log(userID)
    }, [userType, userID])



    //This function calls the backend and loads all the classes in the database onto the dashboard page
    //Eventually this function will only load the classes that the user has access too
    function loadClasses() {
        console.log(userID)
        API.getClassesbyUser(userID)
            .then(resp => {
                console.log(resp.data)

                const newDataObj = resp.data.map((value, index) => {
                    console.log(value)
                    // console.log(value.image);
                   value.badgenotify = value.announcements.length

                    if (value.image) {
                        console.log('exists')

                        const base64flag = 'data:' + value.image.contentType + ';base64,';
                        const imageStr = custFunc.arrayBufferToBase64(value.image.data.data)

                        value.imageBase64Str = base64flag + imageStr
                        return value
                    } else {
                        console.log('does not exist')
                        return value
                    }
                })


                setClassesArr(newDataObj);
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
        console.log(userType);
        setMenuAnchor(event.currentTarget);
        setCurrentClass(event.currentTarget.dataset.classid)
    }

    function handleMenuClose() {
        setMenuAnchor(null);
    }

    function fileSelectHandler(event) {
        setSelectedFile(event.target.files[0]);
    }

    function updateClassImage() {
        console.log(selectedFile)
        console.log(currentClass);
        const fd = new FormData()

        fd.set('image', selectedFile, selectedFile.name);

        API.updateClassImage(currentClass, fd)
            .then(resp => {
                console.log('image saved')
                console.log(resp);
            })
            .catch(err => console.log(err))
    }

    function handleChangeTitle() {
        return (
            <input type='email' placeholder='enter title info'></input>
        )
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

        newClassFormObj.userID = userID

        console.log(newClassFormObj);
        API.addClass(newClassFormObj)
            .then(resp => {
                loadClasses()
                handleDialogClose()
            })
            .catch(err => console.log(err))
    }
    // const classes = useStyles();

    return (
        <Container fluid>
            <Grid align='center'>
                {/* <svg: React.SVGProps<SVGSVGElement>; */}
                <svg viewBox="0 0 4000 490">
                    <symbol id="s-text">
                        <text textAnchor="middle" x="50%" y="50%" style={{ fontSize:"20vw"}}>Classroom Dashboard</text>
                    </symbol>

                    <g className="g-ants">
                        <use xlinkHref="#s-text" className="text-copy"></use>
                        <use xlinkHref="#s-text" className="text-copy"></use>
                        <use xlinkHref="#s-text" className="text-copy"></use>
                        <use xlinkHref="#s-text" className="text-copy"></use>
                        <use xlinkHref="#s-text" className="text-copy"></use>
                    </g>
                </svg>
                <p className='teachertext'>Click the <Fab size="small" color="secondary" aria-label="add">
                    <AddIcon onClick={handleCreateClass} />
                </Fab> <span> to create a course</span>
                </p>
            </Grid>
            <MyCard>
                <Grid

                    container
                    spacing={5}
                    align='center'
                >
                    {
                        classesArr.length > 0 ? classesArr.map((item, index) => {
                            if (item.students.includes(userID)) {
                                return (
                                    <Grid
                                        key={index}
                                        item
                                        md={4}
                                        align="center"
                                    >
                                        <StudentClassCard
                                            key={index}
                                            title={item.courseTitle}
                                            subheader={item.courseDiscipline}
                                            paragraph1={item.courseDescription}
                                            image={item.imageBase64Str}
                                            imageTitle='a'
                                            imageCaption=''
                                            settingsButton={handleMenuClick}
                                            classID={item._id}
                                            badgenotify={item.badgenotify}
                                        >
                                        </StudentClassCard>
                                    </Grid> )
                            } else {
                            return (
                                <Grid 
                                    key={index}
                                    item
                                    md={4}
                                    align="center"
                                >
                                    <TeacherClassCard
                                        key={index}
                                        title={item.courseTitle}
                                        subheader={item.courseDiscipline}
                                        paragraph1={item.courseDescription}
                                        image={item.imageBase64Str}
                                        imageTitle='a'
                                        imageCaption=''
                                        settingsButton={handleMenuClick}
                                        classID={item._id}
                                        badgenotify={item.badgenotify}
                                    >
                                    </TeacherClassCard>
                                </Grid>
                            )
                            }
                        })
                            : <p>No classes Found</p>
                    }
                </Grid>
                {/* --------------------------------------------------------------------- */}
                {/*______________ Below this line is menu for class cards________________ */}
                {/* ----------------------------------------------------------------------*/}
                <Menu
                    id="simple-menu"
                    anchorEl={menuAnchor}
                    keepMounted
                    open={Boolean(menuAnchor)}
                    onClose={handleMenuClose}
                >
                    <MenuItem>
                        <label>
                            Add Image to Class: &nbsp;
              <input type="file" onChange={fileSelectHandler} />
                        </label>
                        <button onClick={updateClassImage}>UPLOAD</button>
                    </MenuItem>
                    <MenuItem onClick={handleChangeTitle}>Change Title</MenuItem>
                    <MenuItem onClick={handleMenuClose}>Update Description</MenuItem>
                </Menu>
            </MyCard>
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
                            margin="dense"
                            id="title"
                            name="title"
                            type="text"
                            fullWidth
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Course Discipline:
            <Input
                            autoFocus
                            disableUnderline
                            margin="dense"
                            id="discipline"
                            name="discipline"
                            type="text"
                            fullWidth
                            onChange={handleInputChange}
                        />
                    </label>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="description"
                        name="description"
                        label="Course Description"
                        type="text"
                        variant="outlined"
                        multiline
                        rowsMax="4"
                        fullWidth
                        onChange={handleInputChange}
                    />
                    <DialogActions>
                        <Button onClick={handleDialogClose} color="primary">
                            Cancel
            </Button>
                        <Button onClick={handleDailogSubmit} color="primary" type="submit">
                            Submit Course
            </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </Container>
    );
};

export default DashBoardTeacher;
