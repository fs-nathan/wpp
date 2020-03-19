import React from 'react';
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from '@material-ui/core';

function CommonControlForm({
  labels = [],
  assign,
  handleChangeAssign,
}) {
  const handleChangeFormAssign = event => {
    const itemValue = event.target.value;
    // console.log('itemValue::::', itemValue);
    let clickedItem = labels.find(item => item.value === itemValue);
    handleChangeAssign(clickedItem);
  };
  return (
    <FormControl component="fieldset">
      <RadioGroup
        aria-label="position"
        name="position"
        value={assign.value}
        onChange={handleChangeFormAssign}
        row
      >
        {labels.map((item, key) => (
          <FormControlLabel
            key={key}
            value={item.value}
            control={<Radio color="primary" />}
            label={item.value}
            labelPlacement="end"
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

export default CommonControlForm