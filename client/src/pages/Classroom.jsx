import React, { useEffect, useState } from 'react'
import API from '../utils/API';
// import ClassroomContext from '../utils/classroomContext'

import ClassBanner from '../components/ClassBanner/ClassBanner';
import Container from '../components/Container/Container';
import Announcement from '../components/AnnouncementForm/Announcement';

import { makeStyles } from '@material-ui/core/styles';
// import { red, blueGrey } from '@material-ui/core/colors';
import { Card, CardActions, CardContent } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';

import AddIcon from '@material-ui/icons/Add';


const useStyles = makeStyles({
    root: {
        minWidth: 275,
        alignItems: 'center',
        justifyContent: 'center'
    },
    announcementTitle: {
        // backgroundColor: 'red'
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});


export const Classroom = (props) => {

    const classes = useStyles();
    const [openDialog, setOpenDialog] = useState(false)
    const [currentClassObj, setCurrentClassObj] = useState([])
    const [announcementObj, setAnnouncementObj] = useState([])

    useEffect(() => {
        const { classroomID } = props.location.state
        loadClassInfo(classroomID)
        loadAnnouncements();
    }, [props.location.state])

    function loadClassInfo(param) {
        API.getClass(param)
            .then(resp => {
                console.log(resp.data)
                const classInfo = resp.data

                setCurrentClassObj(classInfo)
            })
            .catch
            (err => console.log(err))
    }

    function loadAnnouncements() {

    }

    const handleDialogOpen = () => {
        setOpenDialog(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    function handleDialogInputChange(event) {
        const { name, value } = event.target
        setAnnouncementObj({ ...announcementObj, [name]: value })
    }
    
    function handleDialogSubmit(event) {
        event.preventDefault();
        if (announcementObj.title && announcementObj.body) {
            console.log('Announcement looks good so far')
            API.createAnnouncement(currentClassObj._id, announcementObj)
                .then(resp => {
                    console.log(resp)
                    setOpenDialog(false)
                })
                .catch(err => console.log(err))
        }
    }

    function handleClass() {
        console.log(currentClassObj)
    }

    return (
        <div>
            <ClassBanner title={currentClassObj.courseTitle} desc={currentClassObj.courseDescription} />
            <Container>
                <Paper elevation={1} square={false}>
                    <Box p={4} alignItems='center' justifyContent='center' display='flex'>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Paper elevation={2}>
                                    <Card>
                                        <CardContent>
                                            <Typography className={classes.announcementTitle} variant='h4' align='center'>
                                                ANNOUNCEMENTS BOARD &nbsp; &nbsp;
                                                <Tooltip title="Add an announcement" aria-label="add">
                                                    <Fab size="small" color="primary" aria-label="add">
                                                        <AddIcon onClick={handleDialogOpen}/>
                                                    </Fab>
                                                </Tooltip>
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Paper>
                            </Grid>
                            <Grid item xs={12}>
                                <Paper elevation={15}>
                                    <Card className={classes.root} variant="outlined">
                                        {/* ---------------------------------------------------------------------- */}
                                        {/* ___________ This is the beginning of the announcment renderings_______ */}
                                        {/* ------------------------------------------------------------------------- */}
                                        {
                                            announcementObj.length > 0 ? announcementObj.map((announcement, index) => {
                                                return (
                                                    <>
                                                        <CardContent key={index}>
                                                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                                                {/* {currentClassObj.courseTitle} */}
                                                            </Typography>
                                                            <Typography variant="h5" component="h2">
                                                                where are all the students??
                                                            </Typography>
                                                            <Typography className={classes.pos} color="textSecondary">
                                                                well shit ...
                                                            </Typography>
                                                            <Typography variant="body2" component="p">
                                                                well meaning and kindly.
                                                        <br />
                                                                {'"a benevolent smile"'}
                                                            </Typography>
                                                        </CardContent>
                                                        <CardActions>
                                                            <Button size="small" onClick={handleClass}>Learn More</Button>
                                                        </CardActions>
                                                    </>
                                                )
                                            }) :
                                                <CardContent>
                                                    <Typography variant="h5" component="h2">
                                                        No announcements at this time
                                                    </Typography>
                                                </CardContent>

                                        }
                                        {/* ------------------------------------------------------------------------- */}
                                        {/* ___________ This is the end of the announcment renderings________________ */}
                                        {/* ------------------------------------------------------------------------- */}
                                    </Card>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Container>
            <Announcement
             open={openDialog}
             close={handleDialogClose}
             handleInput={handleDialogInputChange}
             submitDialog={handleDialogSubmit}
            />
        </div>
    );
}

export default Classroom;