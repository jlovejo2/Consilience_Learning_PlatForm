import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
    <div className= {classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <h2>Upload your syllabi:</h2>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper className={classes.paper}>
            <h5>Class 1</h5>
            <h6>Tu/Th 2-4:00pm</h6>
            <h6>28 students</h6>
            <Button
                variant="contained"
                color="default"
                href="..."
                className={classes.button}
                startIcon={<CloudUploadIcon />}>
                Upload Syllabus
            </Button>
            <h7>placeholder, make them into cards</h7>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper className={classes.paper}>
            <h5>Class 1</h5>
            <h6>Tu/Th 2-4:00pm</h6>
            <h6>28 students</h6>
            <Button
                variant="contained"
                color="default"
                href="..."
                className={classes.button}
                startIcon={<CloudUploadIcon />}>
                Upload Syllabus
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper className={classes.paper}>
                Class3
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper className={classes.paper}>
                Class4
          </Paper>
        </Grid>
      </Grid>  
    </div>
  );
}
