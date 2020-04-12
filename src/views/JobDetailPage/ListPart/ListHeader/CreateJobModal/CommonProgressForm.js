import React from 'react';
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from '@material-ui/core';

const CommonProgressForm = ({
  handleChange,
  value,
  items,
}) => {
  return (
    <FormControl component="fieldset">
      <RadioGroup
        aria-label="position"
        name="position"
        value={value}
        onChange={e => handleChange(parseInt(e.target.value))}
        row
      >
        {items &&
          items.map((item, key) => (
            <FormControlLabel
              key={key}
              value={item.value}
              control={<Radio color="primary" />}
              label={item.label}
              labelPlacement="end"
            />
          ))}
      </RadioGroup>
    </FormControl>
  );
};

export default CommonProgressForm;