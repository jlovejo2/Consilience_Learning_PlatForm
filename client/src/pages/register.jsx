import React, { useState } from "react";
import Container from "../components/Container/Container.jsx";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Radio from '../components/Radio/Radio.jsx'

export default function FormDialog() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="overarching">
      <Container>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          REGISTER
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Register</DialogTitle>
          <DialogContent>
            {/* <DialogContentText>
              Please complete the following fields:
            </DialogContentText> */}
            <Radio />
            <TextField
              autoFocus
              margin="dense"
              id="username"
              label="First Name*"
              type="name"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="username"
              label="Last Name*"
              type="name"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="username"
              label="Email Address*"
              type="email"
              fullWidth
            />
            <TextField
            autoFocus
            id="filled-password-input"
            label="Password (8-32 characters)*"
            type="password"
            autoComplete="current-password"
            margin="dense"
            fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="discipline"
              label="Primary Discipline (Teacher Only)*"
              type="discipline"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleClose} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
}
