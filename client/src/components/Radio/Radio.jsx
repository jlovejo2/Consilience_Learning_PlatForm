import React from 'react';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

export default function RadioButtonsGroup(props) {

  return (
    <FormControl component="fieldset" name='adsfasdf'>
      <RadioGroup aria-label="user" name="usertype" value={props.radioValue} onChange={props.handleInput}>
        <FormControlLabel value="Teacher" control={<Radio />} label="Teacher" />
        <FormControlLabel value="Student" control={<Radio />} label="Student" />
      </RadioGroup>
    </FormControl>
  );
}