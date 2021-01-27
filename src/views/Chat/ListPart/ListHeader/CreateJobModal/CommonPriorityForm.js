import React from 'react';
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from '@material-ui/core';
import styled from 'styled-components';

const PriorityFormControl = styled(FormControl)`
display: flex;
`;


const PriorityRadioGroup = styled(RadioGroup)`
  justify-content: space-evenly;
`;

const SpecialControlLabel = styled(FormControlLabel)`
  background-color: ${props =>
    props.checked ? '#ff9800' : '#f0f0f0'};
  color: ${props => (props.checked ? 'white' : 'black')};
  width: 27%;
  border-radius: 30px;
  margin: 0;
  justify-content: center;
  padding: 5px 0;
  & > span:first-child {
    display: none;
  }
`;

function CommonPriorityForm(props) {
  const [value, setValue] = React.useState(props.priority);

  const handleChangePriority = itemValue => {
    // Set state to change style in component
    setValue(itemValue);
    // Pass clicked item to parent
    let clickedItem = props.labels.find(item => item.value === itemValue);
    props.handleChangeLabel(clickedItem);
  };

  return (
    <PriorityFormControl component="fieldset">
      <PriorityRadioGroup
        aria-label="position"
        name="position"
        value={value}
        onChange={event => handleChangePriority(event.target.value)}
        row
      >
        {props.labels.map((item, idx) => (
          <SpecialControlLabel
            key={idx}
            value={item.value}
            control={<Radio />}
            label={item.value}
            checked={value === item.value}
          />
        ))}
      </PriorityRadioGroup>
    </PriorityFormControl>
  );
}

export default CommonPriorityForm;