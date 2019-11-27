import React from 'react';
import Select from 'react-select';
import {  makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(theme => ({
  singleValue: {
    fontSize: 14,
  },
  root: {
    flexGrow: 1,
    width: 'auto',
  }
}));


function Option(props) {
  return (
    <MenuItem
      ref={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
        zIndex: 99999,
        
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}


function SingleValue(props) {
  return (
    <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
      {props.children}
    </Typography>
  );
}

const components = {

  Option,
  SingleValue,
};

export default function IntegrationReactSelect(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [single, setSingle] = React.useState(null);

  const handleChangeSingle = selectedItem => {
    setSingle(selectedItem)
    props.setOptions(selectedItem.value)
  };

  const selectStyles = {
    input: base => ({
      ...base,
      color: theme.palette.text.primary,
      '& input': {
        font: 'inherit',
      },
    }),
  };

  React.useEffect(() => {
    if(props.commandSelect) {
      let foundItem = props.commandSelect.find(item => item.value === props.selectedIndex)
      setSingle(foundItem)
    }
  }, [props.commandSelect, props.selectedIndex])

  console.log('props.commandSelect', props.commandSelect)
  return (
    <div className={classes.root}>
      <NoSsr>
        <Select
          classes={classes}
          styles={selectStyles}
          inputId="react-select-single"
          TextFieldProps={{
            InputLabelProps: {
              htmlFor: 'react-select-single',
              shrink: true,
            },
          }}
          placeholder="Select..."
          options={props.commandSelect}
          components={components}
          value={single}
          onChange={handleChangeSingle}
          isDisabled={props.isDisabled}
        />
      </NoSsr>
    </div>
  );
}
