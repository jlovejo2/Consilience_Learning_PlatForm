import React from 'react';
// import Checkbox from '@material-ui/core/Checkbox';
// import FormGroup from '@material-ui/core/FormGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormControl from '@material-ui/core/FormControl';
// import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));

export default function FormControlLabelPosition() {
const classes = useStyles();
  return (
    <>
    <h7>[Class title]</h7>
    <h3>[Assignment title]</h3>
        <h6>[ASSIGNMENT DESCRIPTION]Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laborum sed iusto, ipsum quod quis adipisci, molestias corporis neque.
    </h6>
    <div>
      <Button
        variant="contained"
        color="default"
        href="..."
        className={classes.button}
        startIcon={<CloudUploadIcon />}>
        Submit Assigment
      </Button>
    </div>
    </>
  );
}
