import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import NoSsr from '@material-ui/core/NoSsr';
import { emphasize, makeStyles, useTheme } from '@material-ui/core/styles';
import CancelIcon from '@material-ui/icons/Cancel';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from "react-redux";
import Select, { components } from 'react-select';
import { bgColorSelector } from 'reducers/setting/selectors';
import styled from 'styled-components';
import './styles.scss';
import {Scrollbars} from "react-custom-scrollbars";

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
  height: 150px !important;
`;

const MenuList = ({ children, ...props }) => {
  return (
    <MenuListWrapper {...props}>
      <Scrollbars>
        {children}
      </Scrollbars>
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

function IntegrationReactSelect({ className, options = [], placeholder = '', isMulti = false, value = null, onChange = () => null, }) {
  const classes = useStyles();
  const theme = useTheme();
  const [selected, setSelected] = React.useState(value);
  const bgColor = useSelector(state => bgColorSelector(state));

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
    })
  };

  return (
    <div className={clsx(classes.root, className, 'customSelect')}>
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
          theme={theme => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary: bgColor.color,
            },
          })}
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