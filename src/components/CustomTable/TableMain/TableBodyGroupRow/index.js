import { Button, TableBody, TableCell, TableRow } from '@material-ui/core';
import { mdiMenuDown, mdiMenuUp } from '@mdi/js';
import Icon from '@mdi/react';
import { get } from 'lodash';
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { CustomTableContext } from '../../index';
import './style.scss';
import TableBodyRow from './TableBodyRow';
import IconButton from "@material-ui/core/IconButton";
import AddIcon from '@material-ui/icons/Add';

const StyledTableBodyRowGroup = ({ className = '', ...rest }) => <TableRow className={`comp_CustomTable_TableBodyGroup___row ${className}`} {...rest} />;
const StyledTableBodyCell = ({ className = '', ...rest }) => <TableCell className={`${className}`} {...rest} />;
const CustomButton = ({ className = '', ...rest }) => <Button className={`comp_CustomTable_TableBodyGroup___button ${className}`} {...rest} />;
const getBodyStyle = isDraggingOver => ({
  backgroundColor: isDraggingOver ? "lightblue" : "inherit",
});

function TableBodyGroupRow({ group }) {

  const { options, columns } = React.useContext(CustomTableContext);
  const [open, setOpen] = React.useState(true);

  return (
    <Droppable
      droppableId={group[get(options, 'grouped.id')]}
      direction='vertical'
    >
      {(provided, snapshot) => (
        <TableBody
          innerRef={provided.innerRef}
          {...provided.droppableProps}
          style={getBodyStyle(snapshot.isDraggingOver)}
        >
          <StyledTableBodyRowGroup>
            <StyledTableBodyCell colSpan={get(columns, 'length', 0) + 1}>
              <CustomButton
                fullWidth
                size='small'
                onClick={() => setOpen(open => !open)}
                style={{width: "98%"}}
              >
                {typeof (get(options, 'grouped.label')) === 'function'
                  ? options.grouped.label(group)
                  : group[get(options, 'grouped.label')]}
                {(open || snapshot.isDraggingOver)
                  ? <Icon path={mdiMenuDown} size={1} color='#44485e' />
                  : <Icon path={mdiMenuUp} size={1} color='#44485e' />}
              </CustomButton>
              {typeof (get(options, 'grouped.action')) === 'function' && (
                <IconButton size="small" onClick={() => options.grouped.action(group)}><AddIcon fontSize="inherit"/></IconButton>
              )}
            </StyledTableBodyCell>
          </StyledTableBodyRowGroup>
          {(open || snapshot.isDraggingOver) && group[get(options, 'grouped.item')].map((row, index) => (
            <TableBodyRow key={index} index={index} row={row} group={group} />
          ))}
          {provided.placeholder}
        </TableBody>
      )}
    </Droppable>
  )
}

export default TableBodyGroupRow;
