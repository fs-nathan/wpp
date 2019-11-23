import React from 'react';
import clsx from 'clsx';
import Select from 'react-select';
import { emphasize, makeStyles, useTheme } from '@material-ui/core/styles';
import NoSsr from '@material-ui/core/NoSsr';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';

const suggestions = [
  { label: 'Nguyễn Văn A' },
  { label: 'Nguyễn Văn B' },
  { label: 'Nguyễn Văn C' },
  { label: 'Nguyễn Văn D' },
  { label: 'Nguyễn Văn E' },
  { label: 'Nguyễn Văn F' },
  { label: 'Nguyễn Văn A' },
].map(suggestion => ({
  value: suggestion.label,
  label: suggestion.label,
}));

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height: 'auto',
    minWidth: 290,
  },
  chip: {
    margin: theme.spacing(0.5, 0.25),
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
      0.08,
    ),
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



function MultiValue(props) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={clsx(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused,
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  );
}




const components = {
  MultiValue,
  Option,
};

export default function IntegrationReactSelect() {
  const classes = useStyles();
  const theme = useTheme();
  const [multi, setMulti] = React.useState(null);


  const handleChangeMulti = value => {
    setMulti(value);
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

  return (
    <div className={classes.root}>
      <NoSsr>
        <Select
          classes={classes}
          styles={selectStyles}
          placeholder={'Chọn người duyệt...'}
          options={suggestions}
          components={components}
          value={multi}
          onChange={handleChangeMulti}
          isMulti
        />
      </NoSsr>
    </div>
  );
}
