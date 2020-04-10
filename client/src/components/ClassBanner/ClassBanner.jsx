import React from 'react';
import { Paper, Box } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';



function ClassBanner(props) {

  return (
    <Paper elevation={25} /*style={{ backgroundImage: `url(${post.image})` }}*/>
      <Box p={4}>

        {/* Increase the priority of the hero background image */}
        {/* {<img style={{ display: 'none' }} src={post.image} alt={post.imageText} />} */}
        <div />
        <Grid container>
          <Grid item md={6}>
            <div>
              <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                {props.title}
              </Typography>
              <Typography variant="h5" color="inherit" paragraph>
                {props.desc}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  )
}

export default ClassBanner;