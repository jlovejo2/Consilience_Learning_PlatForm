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
  borderRadius: "15px",
    borderColor: "#8B0000",
    borderWidth: "8px",
    borderStyle: "groove",
    alignItems: 'center',
    marginTop: '2rem',
    marginRight: '12rem',
    paddingRight: '18px',
    paddingLeft: '18px',
    fontWeight: '50px',
}
const stylin2={
  color:"white",
  backgroundColor: "#DC143C",
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
      <FormControlLabel style={stylin3}
        control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} name="checkedH" />}
        label="Mark as important"
      />
    </div>
        </div>
  );
}
