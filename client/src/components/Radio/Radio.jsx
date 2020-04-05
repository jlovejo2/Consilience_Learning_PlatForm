import React, { useState } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default function RadioButtonsGroup() {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormControl component="fieldset">
      <RadioGroup aria-label="user" name="usertype" value={value} onChange={handleChange}>
        <FormControlLabel value="Teacher" control={<Radio />} label="Teacher" />
        <FormControlLabel value="Student" control={<Radio />} label="Student" />
      </RadioGroup>
    </FormControl>
  );
}