import React from 'react';
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from '@material-ui/core';

function CommonControlForm(props) {
  const [value, setValue] = React.useState(props.assign);
  const handleChangeFormAssign = itemValue => {
    // console.log('itemValue::::', itemValue);
    setValue(itemValue);
    let clickedItem = props.labels.find(item => item.value === itemValue);
    props.handleChangeAssign(clickedItem);
  };
  return (
    <FormControl component="fieldset">
      <RadioGroup
        aria-label="position"
        name="position"
        value={value}
        onChange={event => handleChangeFormAssign(event.target.value)}
        row
      >
        {props.labels &&
          props.labels.map((item, key) => (
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