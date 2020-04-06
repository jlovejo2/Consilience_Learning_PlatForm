import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import AttachFileIcon from '@material-ui/icons/AttachFile';
import LinkIcon from '@material-ui/icons/Link';
import { Typography } from "@material-ui/core";

export default function FormDialog(props) {

  return (
    <div className="overarching">

        <Dialog
          open={props.open}
          onClose={props.close}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Announcement</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Title*"
              name='title'
              type="name"
              onChange={props.handleInput}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="body"
              label="Enter your message here*"
              name='body'
              type="name"
              onChange={props.handleInput}
              fullWidth
            />
            <Typography>
            <AttachFileIcon/>
            <LinkIcon/>
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={props.close} color="primary">
              Cancel
            </Button>
            <Button onClick={props.submitDialog} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
    </div>
  );
}
