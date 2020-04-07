import React from 'react';
import ReactDOM from 'react-dom';

export default function Conditional() {
    const classes = useStyles();
  
    return (
      <div className= {classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Selection/>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Card/>
            </Paper>
          </Grid>
        </Grid>  
      </div>
    );
  }
  
ReactDOM.render(
	// <Input />,
	document.getElementById('app')
);