import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));

export default function AssigmentCard() {
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
      <FormControlLabel
        control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} name="checkedH" />}
        label="Mark as important"
      />
    </div>
    </>
  );
}
