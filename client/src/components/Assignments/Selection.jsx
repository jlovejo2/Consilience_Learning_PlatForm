import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default function FormControlLabelPosition() {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Select classes from which to view assignments:</FormLabel>
      <FormGroup aria-label="position" row>
        <FormControlLabel
          value="{CLASS1}"
          control={<Checkbox color="primary" />}
          label="{Class 1}"
          labelPlacement="end"
        />
        <FormControlLabel
          value="{CLASS2}"
          control={<Checkbox color="primary" />}
          label="{Class 2}"
          labelPlacement="end"
        />
        <FormControlLabel
          value="{CLASS3}"
          control={<Checkbox color="primary" />}
          label="{Class 3}"
          labelPlacement="end"
        />
        <FormControlLabel
          value="{CLASS4}"
          control={<Checkbox color="primary" />}
          label="{Class 4}"
          labelPlacement="end"
        />
      </FormGroup>
    </FormControl>
  );
}
