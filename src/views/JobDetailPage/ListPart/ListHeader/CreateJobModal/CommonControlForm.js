import { FormControl, FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { currentColorSelector } from 'views/JobDetailPage/selectors';

const StyledFormControlLabel = styled(FormControlLabel)`
  .Mui-checked {
    color: ${props => props.selectedColor};
  }
`

function CommonControlForm({
  labels = [],
  assign,
  handleChangeAssign,
}) {
  const groupActiveColor = useSelector(currentColorSelector)

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
          <StyledFormControlLabel
            selectedColor={groupActiveColor}
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