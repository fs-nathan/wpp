import { useTranslation } from 'react-i18next';
import React from 'react';
import Select from 'react-select';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Typography, TextField, MenuItem, NoSsr } from '@material-ui/core';

const suggestions = [
  { label: 'Nguyễn Văn A' },
  { label: 'Nguyễn Văn B' },
  { label: 'Nguyễn Văn C' },
  { label: 'Nguyễn Văn D' }
].map(suggestion => ({
  value: suggestion.label,
  label: suggestion.label,
}));

const useStyles = makeStyles(theme => ({
  singleValue: {
    fontSize: 14,
  },
  input: {
    display: 'flex',
    padding: 0,
    height: 'auto',
  },

}));

function Option(props) {
  const { t } = useTranslation();
  return (
    <MenuItem
      ref={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function inputComponent({ inputRef, ...props }) {
  const { t } = useTranslation();
    return <div ref={inputRef} {...props} />;
  }

function Control(props) {
  const { t } = useTranslation();
    const {
      children,
      innerProps,
      innerRef,
      selectProps: { classes, TextFieldProps },
    } = props;
  
    return (
      <TextField
        fullWidth
        InputProps={{
          inputComponent,
          inputProps: {
            className: classes.input,
            ref: innerRef,
            children,
            ...innerProps,
          },
        }}
        {...TextFieldProps}
      />
    );
  }

function SingleValue(props) {
  const { t } = useTranslation();
  return (
    <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
      {props.children}
    </Typography>
  );
}


const components = {
  Option,
  SingleValue,
  Control,
};

export default function InputSelcct() {
  const { t } = useTranslation();
  const classes = useStyles();
  const theme = useTheme();
  const [single, setSingle] = React.useState(null);

  const handleChangeSingle = value => {
    setSingle(value);
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
          inputId="react-select-single"
          TextFieldProps={{
            InputLabelProps: {
              htmlFor: 'react-select-single',
              shrink: true,
            },
          }}
          placeholder={t('LABEL_CHAT_TASK_SELECT')}
          options={suggestions}
          components={components}
          value={single}
          onChange={handleChangeSingle}
        />
      </NoSsr>
    </div>
  );
}
