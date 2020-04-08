import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
// eslint-disable-next-line
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Radio from '../Radio/Radio.jsx';

export default function FormDialog(props) {

  return (
    <div className="overarching">

        <Dialog
          open={props.open}
          onClose={props.close}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Register</DialogTitle>
          <DialogContent>
            {/* <DialogContentText>
              Please complete the following fields:
            </DialogContentText> */}
            <Radio {...props} />
            <TextField
              autoFocus
              margin="dense"
              id="username"
              label="First Name*"
              name='firstName'
              type="name"
              onChange={props.handleInput}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="username"
              label="Last Name*"
              name='lastName'
              type="name"
              onChange={props.handleInput}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="username"
              label="Email Address*"
              name='email'
              type="email"
              onChange={props.handleInput}
              fullWidth
            />
            <TextField
            autoFocus
            id="filled-password-input"
            label="Password (8-32 characters)*"
            type="password"
            name='password'
            autoComplete="current-password"
            margin="dense"
            onChange={props.handleInput}
            fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="discipline"
              label="Primary Discipline (Teacher Only)*"
              name='discipline'
              type="discipline"
              onChange={props.handleInput}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={props.close} color="primary">
              Cancel
            </Button>
            <Button onClick={props.submitRegister} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
    </div>
  );
}
