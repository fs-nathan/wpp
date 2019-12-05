import React from 'react';
import styled from 'styled-components';
import {
  TableRow,
  TableCell,
  Avatar,
  List,
  Button,
  withStyles,
  Checkbox
} from '@material-ui/core';
import MuiDialogContent from '@material-ui/core/DialogContent';
import { darken } from '@material-ui/core/styles';
import colorPal from '../../../../helpers/colorPalette';
import { FileType } from '../../../../components/FileType';

export const StyledList = styled(List)`
  padding: 5px 0;
`;
export const RightHeader = styled.div`
  margin-left: auto;
  & > *:last-child {
    margin-left: 16px;
    padding: 8px 12px;
    margin-top: 8px;
  }
`;
export const StyledButton = styled(Button)`
  background-color: ${colorPal['orange'][0]};
  color: #fff;
  &:hover {
    background-color: ${darken(colorPal['orange'][0], 0.1)};
  }
`;
export const StyledTableHeadRow = styled(TableRow)`
  background-color: rgba(0, 0, 0, 0);
`;
export const StyledTableHeadCell = styled(({ children, ...rest }) => (
  <TableCell {...rest} onClick={() => console.log('LALLA')}>
    <div>{children}</div>
  </TableCell>
))`
  color: gray;
  padding: 11px;
  width: ${props => props.width || null};
  & > div {
    font-size: 1.2rem;
    display: inline-flex;
  }
  & > div > svg {
    margin-left: 4px;
  }
  &:not(:first-child):hover {
    color: black;
    font-weight: bold;
  }
  &:nth-child(4) > div {
    justify-content: start;
  }
  &:last-child {
    padding: 16px;
  }
`;
export const StyledTableBodyRow = styled(TableRow)`
  background-color: #fff;
`;
export const StyledTableBodyCell = styled(TableCell)`
  padding: 11px;
  width: ${props => props.width || null};
  & > * {
  }
  &:nth-child(4) > * {
    justify-content: flex-start;
  }
`;
export const WrapAvatar = styled.div`
  display: flex;
  justify-content: center;
`;
export const FullAvatar = styled(props => (
  <Avatar
    src={props.src}
    alt="avatar"
    style={{ borderRadius: 'unset', width: 35, height: 35 }}
  />
))``;
export const DialogContent = withStyles(theme => ({
  root: { padding: theme.spacing(2) }
}))(MuiDialogContent);

export const getIconByType = type => FileType(type);

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
export const GreenCheckbox = withStyles({
  root: {
    // color: '#06c30e',
    // '&$checked': {
    //   color: '#06c30e'
    // }
  },
  checked: {}
})(props => <Checkbox color="primary" {...props} />);
