import { useTranslation } from 'react-i18next';
import React from 'react';
import clsx from 'clsx';
import Select from 'react-select';
import { emphasize, makeStyles, useTheme } from '@material-ui/core/styles';
import NoSsr from '@material-ui/core/NoSsr';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';
import { getIndividualHandleUsers } from '../../../../helpers/jobDetail/arrayHelper';

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
  const { t } = useTranslation();
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
  const { t } = useTranslation();
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

const DEFAULT_HANDLE_USERS = []

export default function IntegrationReactSelect(props) {
  const { t } = useTranslation();
  const classes = useStyles();
  const theme = useTheme();
  const [handleUsers, setHandleUsers] = React.useState(DEFAULT_HANDLE_USERS)

  let listHandleUsers = getIndividualHandleUsers(props.member).map((item, key) =>
    ({ label: item.name, value: item.id })
  )

  const handleChangeMulti = value => {
    let userIdArr = []
    // User append 1 item
    if (value) {
      setHandleUsers(value)
      userIdArr = value.map(item => item.value)
    } 
    // User remove or unselect item
    else {
      setHandleUsers(DEFAULT_HANDLE_USERS)
    }
    // Pass id array to parent
    props.handleChooseUser(userIdArr)
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
          placeholder={t('LABEL_CHAT_TASK_CHON_NGUOI_DUYET')}
          options={listHandleUsers}
          components={components}
          value={handleUsers}
          onChange={handleChangeMulti}
          isMulti
        />
      </NoSsr>
    </div>
  );
}
