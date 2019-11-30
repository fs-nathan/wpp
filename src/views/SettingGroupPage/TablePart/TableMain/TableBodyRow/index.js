import React from 'react';
import styled, { css } from 'styled-components';
import { TableCell, TableRow, Avatar, Checkbox, Typography, } from '@material-ui/core';
// import { Draggable } from 'react-beautiful-dnd';
// import Icon from '@mdi/react';
// import {
//   mdiDragVertical,
// } from '@mdi/js';
import ColorTypo from '../../../../../components/ColorTypo';
import avatar from '../../../../../assets/avatar.jpg';
import folderIcon from '../../../../../assets/folder.png';
import jpgFileIcon from '../../../../../assets/file_jpg_type.png';
import colorPal from '../../../../../helpers/colorPalette'
import { getActiveTab } from '../../../commonFunction'
import { VARIABLE_TYPE, FIELD_TYPE } from '../../../../../constants/documentCell'

const StyledTableBodyRow = styled(TableRow)`
  background-color: #fff;
`;

const StyledTableBodyCell = styled(TableCell)`
  padding: 8px;
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

const FullAvatar = styled(props =>
  <Avatar
    src={props.src} alt="avatar"
    style={{ borderRadius: "unset", width: 35, height: 35 }}
  />)``;

const MainTypo = styled(({ color, uppercase, bold, ...rest }) => <Typography {...rest} />)`
  color: ${props => props.color ? colorPal[props.color][0] : colorPal['default'][0]};
  ${props => props.uppercase && css`
    text-transform: uppercase;
  `}
  ${props => props.bold && css`
    font-weight: 400;
  `}
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

function getIconByType(type) {
  switch (type) {
    case "jpg":
      return jpgFileIcon
    case "folder":
      return folderIcon
    default:
      return ""
  }
}

function getCell(key, col, doc) {
  const type = col.type
  let text = "", color = "", path = ""

  switch (type[1]) {
    case VARIABLE_TYPE.TYPE:
      path = getIconByType(doc.type)
      break
    case VARIABLE_TYPE.NAME:
      text = doc.name
      color = "blue"
      break
    case VARIABLE_TYPE.LOCATION:
      text = doc.location
      color = "blue"
      break
    case VARIABLE_TYPE.AVATAR:
      // TODO: load image
      path = avatar
      break
    case VARIABLE_TYPE.SIZE:
      text = doc.size
      color = "black"
      break
    case VARIABLE_TYPE.DATE:
      text = doc.date
      color = "black"
      break
    default:
      break
  }

  switch (type[0]) {
    case FIELD_TYPE.ICON:
      return (
        <StyledTableBodyCell key={key} align={col.align}>
          <WrapAvatar>
            <FullAvatar src={path} />
          </WrapAvatar>
        </StyledTableBodyCell>
      )
    case FIELD_TYPE.AVATAR:
      return (
        <StyledTableBodyCell key={key} align={col.align}>
          <WrapAvatar>
            <Avatar src={path} />
          </WrapAvatar>
        </StyledTableBodyCell>
      )
    case FIELD_TYPE.CLICK_TEXT:
      return (
        <StyledTableBodyCell key={key} align={col.align}>
          <MainTypo color={color}>
            {text}
          </MainTypo>
        </StyledTableBodyCell>
      )
    case FIELD_TYPE.NORMAL_TEXT:
      return (
        <StyledTableBodyCell key={key} align={col.align}>
          <ColorTypo color={color}>
            {text}
          </ColorTypo>
        </StyledTableBodyCell>
      )
    default:
      return(<div></div>)
  }
}

function getRow(props) {

  const activeTab = getActiveTab(props.activeTabId)

  return (
    <StyledTableBodyRow
    // innerRef={provided.innerRef}
    // {...provided.draggableProps} 
    >
      {/* <StyledTableBodyCell>
            <div {...provided.dragHandleProps}>
              <Icon path={mdiDragVertical} size={1} color='rgba(0, 0, 0, 0.7)'/>
            </div>
          </StyledTableBodyCell> 
      */}
      <StyledTableBodyCell>
        <Checkbox />
      </StyledTableBodyCell>

      {activeTab.columns.map((col, idx) => getCell(idx, col, props.doc))}



      {/* <StyledTableBodyCell align="center">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Avatar
            src={src} alt='avatar'
            style={{ borderRadius: "unset", width: 35, height: 35 }} />
        </div>
      </StyledTableBodyCell>
      <StyledTableBodyCell>
        <MainTypo color={color}>
          {name}
        </MainTypo>
      </StyledTableBodyCell>
      <StyledTableBodyCell align="center">
        <ColorTypo color="blue">{location}</ColorTypo>
      </StyledTableBodyCell>
      <StyledTableBodyCell>
        <ColorTypo>{date}</ColorTypo>
      </StyledTableBodyCell>
      <StyledTableBodyCell>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Avatar src={avatar} alt='avatar' />
        </div>
      </StyledTableBodyCell>
      <StyledTableBodyCell align="right">
        <ColorTypo style={{ paddingRight: 8 }}>{size + " MB"}</ColorTypo>
      </StyledTableBodyCell> */}




    </StyledTableBodyRow>
  );
}

function TableBodyRow(props) {

  return (
    // <Draggable 
    // draggableId={task.id}
    // index={index}  
    // >
    // {(provided) => ( 
    getRow(props)

    //   )}
    // </Draggable>
  );
}

export default TableBodyRow;
