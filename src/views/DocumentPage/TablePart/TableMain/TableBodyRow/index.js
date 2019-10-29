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

function GetFileByType({ type, name, size, location, date }) {
  let color, src
  switch (type) {
    case "jpg":
      color = "blue"
      src = jpgFileIcon
      break;
    case "folder":
      color = "black"
      src = folderIcon
      break;
    default:
      break;
  }

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
      <StyledTableBodyCell align="center">
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
      </StyledTableBodyCell>
    </StyledTableBodyRow>
  );
}

function TableBodyRow({ task, index }) {

  return (
    // <Draggable 
    // draggableId={task.id}
    // index={index}  
    // >
    // {(provided) => ( 
    GetFileByType(task)

    //   )}
    // </Draggable>
  );
}

export default TableBodyRow;
