import React, { useEffect, useState, useContext } from 'react'
import API from '../utils/API';
import RootContext from '../utils/RootContext';

import ClassBanner from '../components/ClassBanner/ClassBanner';
import Container from '../components/Container/Container';
import Announcement from '../components/AnnouncementForm/Announcement';
import CommentButton from '../components/Comments/CommentButton';

import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent } from '@material-ui/core';
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
        color: 'black',
        // fontSize: 20
    },
    title: {
        fontSize: 14,
    },
    pos: {
        // marginBottom: 12,
    },
    center: {
        alignItems: 'center',
        // margin: 'auto'
        justifyContent: 'center'
    }
});

export const Classroom = (props) => {

    const classes = useStyles();
    const { userType, userID } = useContext(RootContext)
    const [openDialog, setOpenDialog] = useState(false)
    const [currentClassObj, setCurrentClassObj] = useState([])
    const [announcementObj, setAnnouncementObj] = useState([])
    const [commentObj, setCommentObj] = useState([])

    useEffect(() => {
        const { classroomID } = props.location.state
        loadClassInfo(classroomID)
        console.log(userType);
        console.log(userID);
        // loadAnnouncements(classroomID);
    }, [props.location.state, userType, userID])

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

    function handleAddComment(event, announcementIndex) {
        // console.log(event.keyCode);
        // console.log(event.target);
        // console.log(announcementIndex)
        // console.log(currentClassObj)
        if(event.keyCode === 13) {
            console.log('submitted on enter');
            API.createCommemt(currentClassObj._id, currentClassObj.announcements[announcementIndex]._id, event.target.value)
            .then(resp => {
                console.log(resp)
            })
            .catch(err => console.log(err))
        }
    }

    function handleCommentChange(event) {
        const { name, value } = event.target
        setAnnouncementObj({ ...commentObj, [name]: value })
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
                                            <Typography className={classes.announcementTitle} variant='h3' align='center'>
                                                ANNOUNCEMENTS BOARD &nbsp; &nbsp;
                                                <Tooltip title="Add an announcement" aria-label="add">
                                                    <Fab size="small" color="primary" aria-label="add">
                                                        <AddIcon onClick={handleDialogOpen} />
                                                    </Fab>
                                                </Tooltip>
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Paper>
                            </Grid>
                            {/* ---------------------------------------------------------------------- */}
                            {/* ___________ This is the beginning of the announcment renderings_______ */}
                            {/* ------------------------------------------------------------------------- */}
                            {
                                currentClassObj.announcements ? currentClassObj.announcements.map((announcement, index) => {
                                    return (
                                        <>
                                            <Grid item xs={12}>
                                                <Paper elevation={15}>
                                                    <Card className={classes.root} variant="outlined">
                                                        <CardContent key={index}>
                                                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                                                {/* {currentClassObj.courseTitle} */}
                                                            </Typography>
                                                            <Typography variant="h5" component="h2">
                                                                {announcement.title}
                                                            </Typography>
                                                            <Typography className={classes.pos} color="textSecondary">
                                                                well shit ...
                                                            </Typography>
                                                            <Typography variant="body2" component="p">
                                                                {announcement.body}
                                                            </Typography>
                                                        </CardContent>
                                                        <CardActions>
                                                            <Grid container className={classes.center}>
                                                                <CommentButton inputComment={handleCommentChange}
                                                                 submitComment={(event) => { handleAddComment(event, index) }}/> 
                                                            </Grid>
                                                        </CardActions>
                                                    </Card>
                                                </Paper>
                                            </Grid>
                                        </>
                                    )
                                }) :
                                    <Grid item xs={12}>
                                        <Paper elevation={15}>
                                            <Card className={classes.root} variant="outlined">
                                                <CardContent>
                                                    <Typography variant="h5" component="h2">
                                                        No announcements at this time
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Paper>
                                    </Grid>
                            }
                            {/* ------------------------------------------------------------------------- */}
                            {/* ___________ This is the end of the announcment renderings________________ */}
                            {/* ------------------------------------------------------------------------- */}
                        </Grid>
                    </Box>
                </Paper>
            </Container>
            {/* ---------------------------------------------------------------------------------------- */}
            {/* _____________The below component renders the dialog to add an announcement______________ */}
            {/* ----------------------------------------------------------------------------------------- */}
            <Announcement
                open={openDialog}
                close={handleDialogClose}
                handleInput={handleDialogInputChange}
                submitDialog={handleDialogSubmit}
            />
        </div >
    );
}

export default Classroom;