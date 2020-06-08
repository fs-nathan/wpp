import React from 'react';
import Select from 'react-select';
import { makeStyles, useTheme } from '@material-ui/core/styles';
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
    '&:focus': {
      outline: 'none'
    }
  }
}));

function Option(props) {
  return (
    <MenuItem
      ref={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 400 : 400,
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
    container: base => ({
      ...base,
      '&:focus': {
        outline: 'none'
      }
    }),
    control: (base, state) => ({
      ...base,
      boxShadow: state.isFocused ? 'none' : 'none',
      borderColor: state.isFocused ? 'hsl(0,0%,80%)' : 'hsl(0,0%,80%)',
      '&:hover': {
        boxShadow: 'none',
        borderColor: 'hsl(0,0%,80%)',
        outline: 'none'
      }
    }),
  };

  React.useEffect(() => {
    if (props.commandSelect) {
      let foundItem = props.commandSelect.find(item => item.value === props.selectedIndex)
      if (foundItem) setSingle(foundItem)
    }
  }, [props.commandSelect, props.selectedIndex])

  // console.log('props.commandSelect', props.commandSelect)
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
          placeholder={props.placeholder ? props.placeholder : "Select..."}
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
