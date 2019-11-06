import React from 'react';
import clsx from 'clsx';
import Select, { components } from 'react-select';
import { emphasize, makeStyles, useTheme } from '@material-ui/core/styles';
import styled from 'styled-components';
import NoSsr from '@material-ui/core/NoSsr';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';
import PropTypes from 'prop-types';

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
      component="span"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
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

const MenuListWrapper = styled(components.MenuList)`
  max-height: 200px !important;
`;

const MenuList = ({ children, ...props }  ) => {
return (
    <MenuListWrapper {...props}>
      {children}
    </MenuListWrapper>
  );
};

const Menu = ({ children, ...props }) => {
  return (
    <components.Menu {...props}>
      {children}
    </components.Menu>
  );
};

const _components = {
  MultiValue,
  Option,
  MenuList,
  Menu,
};

function IntegrationReactSelect({ options = [], placeholder = '', isMulti = false, value = null, onChange = () => null, }) {
  const classes = useStyles();
  const theme = useTheme();
  const [selected, setSelected] = React.useState(value);

  React.useEffect(() => {
    setSelected(value);
  }, [value]);

  const handleChangeValue = value => {
    setSelected(value);
    onChange(value);
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
          placeholder={placeholder}
          options={options}
          components={_components}
          value={selected}
          onChange={handleChangeValue}
          isMulti={isMulti}
        />
      </NoSsr>
    </div>
  );
}

IntegrationReactSelect.propTypes = {
  options: PropTypes.array, 
  placeholder: PropTypes.string, 
  isMulti: PropTypes.bool, 
  value: PropTypes.any, 
  onChange: PropTypes.func,
}

export default IntegrationReactSelect;