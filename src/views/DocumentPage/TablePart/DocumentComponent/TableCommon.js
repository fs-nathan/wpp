import React from 'react';
import styled from 'styled-components';
import {
  TableCell,
  Avatar,
  Button,
  withStyles,
  Checkbox
} from '@material-ui/core';
import MuiDialogContent from '@material-ui/core/DialogContent';
import { darken } from '@material-ui/core/styles';
import colorPal from '../../../../helpers/colorPalette';
import '../DocumentPage.scss';

export const RightHeader = props => (
  <div className="right-header">{props.children}</div>
);
export const StyledButton = styled(Button)`
  background-color: ${colorPal['orange'][0]};
  color: #fff;
  &:hover {
    background-color: ${darken(colorPal['orange'][0], 0.1)};
  }
`;
export const StyledTableHeadCell = props => (
  <TableCell
    {...props.rest}
    width={props.width}
    align={props.align || 'center'}
    onClick={() => {}}
    className={`table-head-cell ${props.className}`}
  >
    {props.children}
  </TableCell>
);
export const StyledTableBodyCell = props => (
  <TableCell
    {...props}
    align={props.align || 'center'}
    className={`table-body-cell ${props.className || ''}`}
  >
    {props.children}
  </TableCell>
);
export const FullAvatar = props => (
  <div className="avatar-wrapper">
    <Avatar {...props} alt="avatar" className="avatar-image" />
  </div>
);
export const CustomAvatar = props => (
  <Avatar
    alt="avatar"
    title={props.title || ''}
    className={`custom-avatar-image ${(props.icsmall ? 'ic-small' : '')}`}
    {...props}
  />
);
export const DialogContent = withStyles(theme => ({
  root: { padding: theme.spacing(2) }
}))(MuiDialogContent);

export const selectItem = (selected, id) => {
  const selectedIndex = selected.indexOf(id);
  let newSelected = [];
  if (selectedIndex === -1) {
    newSelected = newSelected.concat(selected, id);
  } else if (selectedIndex === 0) {
    newSelected = newSelected.concat(selected.slice(1));
  } else if (selectedIndex === selected.length - 1) {
    newSelected = newSelected.concat(selected.slice(0, -1));
  } else if (selectedIndex > 0) {
    newSelected = newSelected.concat(
      selected.slice(0, selectedIndex),
      selected.slice(selectedIndex + 1)
    );
  }
  return newSelected;
};
export const selectAll = (e, data) => {
  if (e.target.checked) {
    const newSelecteds = data.map(n => n.id);
    return newSelecteds;
  }
  return [];
};
export const selectItemRedux = (selected, item) => {
  let selectedIndex = -1;
  selected.forEach((element, index) => {
    if (element.id === item.id) {
      selectedIndex = index;
      return;
    }
  });
  let newSelected = [];
  if (selectedIndex === -1) {
    newSelected = newSelected.concat(selected, item);
  } else if (selectedIndex === 0) {
    newSelected = newSelected.concat(selected.slice(1));
  } else if (selectedIndex === selected.length - 1) {
    newSelected = newSelected.concat(selected.slice(0, -1));
  } else if (selectedIndex > 0) {
    newSelected = newSelected.concat(
      selected.slice(0, selectedIndex),
      selected.slice(selectedIndex + 1)
    );
  }
  return newSelected;
};
export const selectAllRedux = (e, data) => {
  if (e.target.checked) {
    const newSelecteds = data;
    return newSelecteds;
  }
  return [];
};
export const GreenCheckbox = withStyles({
  root: {
    color: '#d9d9d9'
    // '&$checked': {
    //   color: '#06c30e'
    // }
  },
  checked: {}
})(props => <Checkbox color="primary" {...props} />);
