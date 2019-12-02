import React from 'react';
import styled, { css } from 'styled-components';
import {
  TableCell,
  TableRow,
  Avatar,
  Checkbox,
  Typography
} from '@material-ui/core';
import ColorTypo from '../../../../../components/ColorTypo';
import avatar from '../../../../../assets/avatar.jpg';
import folderIcon from '../../../../../assets/folder.png';
import jpgFileIcon from '../../../../../assets/file_jpg_type.png';
import colorPal from '../../../../../helpers/colorPalette';
import { getActiveTab } from '../../../commonFunction';
import {
  VARIABLE_TYPE,
  FIELD_TYPE
} from '../../../../../constants/documentCell';

const StyledTableBodyRow = styled(TableRow)`
  background-color: #fff;
`;
const StyledTableBodyCell = styled(TableCell)`
  padding: 11px;
  & > * {
  }
  &:nth-child(4) > * {
    justify-content: flex-start;
  }
`;
const WrapAvatar = styled.div`
  display: flex;
  justify-content: center;
`;
const FullAvatar = styled(props => (
  <Avatar
    src={props.src}
    alt="avatar"
    style={{ borderRadius: 'unset', width: 35, height: 35 }}
  />
))``;
const MainTypo = styled(({ color, uppercase, bold, ...rest }) => (
  <Typography {...rest} />
))`
  color: ${props =>
    props.color ? colorPal[props.color][0] : colorPal['default'][0]};
  ${props =>
    props.uppercase &&
    css`
      text-transform: uppercase;
    `}
  ${props =>
    props.bold &&
    css`
      font-weight: 400;
    `}
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const getIconByType = type => {
  switch (type) {
    case 'jpg':
      return jpgFileIcon;
    case 'folder':
      return folderIcon;
    default:
      return '';
  }
};

const getCell = (key, col, doc) => {
  const type = col.type;
  let text = '';
  let color = '';
  let path = '';
  switch (type[1]) {
    case VARIABLE_TYPE.TYPE:
      path = getIconByType(doc.type);
      break;
    case VARIABLE_TYPE.NAME:
      text = doc.name;
      color = 'blue';
      break;
    case VARIABLE_TYPE.LOCATION:
      text = doc.location;
      color = 'blue';
      break;
    case VARIABLE_TYPE.AVATAR:
      // TODO: load image
      path = avatar;
      break;
    case VARIABLE_TYPE.SIZE:
      text = doc.size;
      color = 'black';
      break;
    case VARIABLE_TYPE.DATE:
      text = doc.date;
      color = 'black';
      break;
    default:
      break;
  }
  let result = null;
  switch (type[0]) {
    case FIELD_TYPE.ICON:
      result = (
        <WrapAvatar>
          <FullAvatar src={path} />
        </WrapAvatar>
      );
      break;
    case FIELD_TYPE.AVATAR:
      result = (
        <WrapAvatar>
          <Avatar src={path} />
        </WrapAvatar>
      );
      break;
    case FIELD_TYPE.CLICK_TEXT:
      result = <MainTypo color={color}>{text}</MainTypo>;
      break;
    case FIELD_TYPE.NORMAL_TEXT:
      result = <ColorTypo color={color}>{text}</ColorTypo>;
      break;
    default:
      break;
  }
  return (
    <StyledTableBodyCell key={key} align={col.align}>
      {result}
    </StyledTableBodyCell>
  );
};

const getRow = props => {
  const activeTab = getActiveTab(props.activeTabId);
  return (
    <StyledTableBodyRow>
      <StyledTableBodyCell>
        <Checkbox />
      </StyledTableBodyCell>
      {activeTab.columns.map((col, idx) => getCell(idx, col, props.doc))}
    </StyledTableBodyRow>
  );
};

const TableBodyRow = props => {
  return getRow(props);
};

export default TableBodyRow;
