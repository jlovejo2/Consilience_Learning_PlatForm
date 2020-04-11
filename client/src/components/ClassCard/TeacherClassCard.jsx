import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
// import RootContext from '../../utils/RootContext';
import clsx from 'clsx';
import './style.css';

import { Card, CardHeader, CardMedia, CardContent, CardActions } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import { red } from '@material-ui/core/colors';

import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import CreateIcon from '@material-ui/icons/Create';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import TableChartIcon from '@material-ui/icons/TableChart';
import NotificationsIcon from '@material-ui/icons/Notifications';


const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: '#61dbfb',
    // background: 'repeating-radial-gradient(circle farthest-side at bottom left, rgb(255, 255, 255) 58%, rgb(97, 219, 251) 89%)',
    borderRadius: "30px",
    borderColor: "#61dbfb",
    borderWidth: "10px",
    borderStyle: "double",
    // boxShadow: '0 3px 5px 2px rgba(191, 191, 191, .3)',
    width: "100%",
    height: "100%",
    // display: "inline-grid",
    // background: 'rgb(66,66,66)',
    // background: 'linear-gradient(254deg, rgba(66,66,66,1) 0%, rgba(97,219,251,1) 100%)',
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
    display: "block",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function ClassCard(props) {
  


  // const { userType, classID, setClassID } = useContext(RootContext)
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [redirectUser, setRedirectUser] = useState(false);
  // const [userID, setUserID] = useState('')
  // const [userType, setUserType] = useState('')
  // const [classID, setClassID] = useState('')


  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleEnterClass = (event, classID) => {
    console.log(classID)
    localStorage.setItem( 'classId', classID)
    setRedirectUser('/classrooms')
  }

  const handleEnterGradebook = (event, classID) => {
    localStorage.setItem ( 'classId', classID)
    setRedirectUser('/grades')
  }

  if (redirectUser) {
   
   return <Redirect to={redirectUser}
    />
}

  return (
    <Card className={classes.root} value={props.classID}>
      <CardHeader
        data-classid={props.classID}
        avatar={<Avatar alt="Teacher Image" src={props.teacherAvatar} />}
        action={
          <IconButton
            aria-label="settings"
            aria-controls="simple-menu"
            onClick={props.settingsButton}
            data-classid={props.classID}
          >
            <MoreVertIcon />
          </IconButton> }
        title={props.title}
        subheader={props.subheader}
      />
      {/*------------------------ This is the end of CardHeader ---------------------------*/}
      {/*----------------------- This is the beginning of Card Image and Caption Location------------- */}
      {props.image ? (
        <CardMedia
          className={classes.media}
          image={props.image}
          title={props.imageTitle}
          src=""
        />
      ) : (
          ""
        )}
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.imageCaption}
        </Typography>
      </CardContent>
      {/*----------------------- This is the end of Card Image and Caption Location------------- */}
      {/*----------------------- This is the Beginning of Card Button(Icons) location------------- */}
      <CardActions disableSpacing>
            <IconButton aria-label="edit">
              <CreateIcon />
            </IconButton>
        <Tooltip title="Enter Classroom" aria-label="enter">
          <IconButton onClick={(event) => handleEnterClass(event, props.classID)}>
              <MeetingRoomIcon />
          </IconButton>
        </Tooltip>
            <Tooltip title="Go to Gradebook" aria-label="enter">
              <IconButton onClick={(event) => handleEnterGradebook(event, props.classID)}>
                  <TableChartIcon />
              </IconButton>
            </Tooltip>
        <Badge badgeContent={4} color="secondary">
          <NotificationsIcon />
        </Badge>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      {/*----------------------- This is end of Card Button(Icons) location------------- */}
      {/*----------------------- This is the Beginning of Card Expanded menu, essentially description of Class------------- */}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Description: </Typography>
          <Typography paragraph>{props.paragraph1}</Typography>
        </CardContent>
      </Collapse>
      {/*----------------------- This is the End of Card Expanded menu, essentially description of Class------------- */}
    </Card>
  );
}
