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
      margin: theme.spacing(4),
    },
  }));

const stylin={
  color:"white",
  backgroundColor: "#61dbfb",
  borderRadius: "10px",
    borderColor: "#8B0000",
    borderWidth: "3px",
    borderStyle: "outset",
    alignItems: 'center',
    marginTop: '2rem',
    marginRight: 'auto',
    marginLeft: 'auto',

}
const stylin2={
  color:"white",
  backgroundColor: "#DC143C",
  // marginRight: "2rem",
  alignItems: 'center',
  marginRight: 'auto',
  marginLeft: 'auto',

}
const stylin3={
  color:"white",
  

}

export default function AssigmentCard({classTitle, title, description, attachments}) {
const classes = useStyles();

  return (
    <div style={stylin}>
    {/* <h7>{classTitle}</h7> */}
    <h3>{title}</h3>
    <h5>{description}</h5>
    <div>
      <Button style={stylin2}
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
        </div>
  );
}
