import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Selection from './Selection'
// import './style.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    // marginTop: '4rem',
    // marginBottom: '5rem',
    // marginLeft: 'auto',
    // marginRight: 'auto',
    // paddingRight: 'auto',
    // paddingLeft: 'auto',
    // borderRadius: '20px',
    color: theme.palette.text.secondary,
    // background: 'repeating-radial-gradient(circle farthest-side at bottom left, rgb(255, 255, 255) 58%, rgb(97, 219, 251) 89%)',
  },
}));

export default function FullWidthGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={10}>
          <Paper className={classes.paper}><Selection/></Paper>
        </Grid>
        <Grid item xs={10}>
          <Paper className={classes.paper}>Class</Paper>
        </Grid>
        <Grid item xs={10}>
          <Paper className={classes.paper}>Class (add in js logic later)</Paper>
        </Grid>
      </Grid>
    </div>
  );
}
