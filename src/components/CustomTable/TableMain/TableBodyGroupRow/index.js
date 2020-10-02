import { Button, TableBody, TableCell, TableRow } from '@material-ui/core';
import { mdiMenuDown, mdiMenuUp } from '@mdi/js';
import Icon from '@mdi/react';
import { get } from 'lodash';
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { CustomTableContext } from '../../index';
import './style.scss';
import TableBodyRow from './TableBodyRow';

const StyledTableBodyRowGroup = ({ className = '', ...rest }) => <TableRow className={`comp_CustomTable_TableBodyGroup___row ${className}`} {...rest} />;
const StyledTableBodyCell = ({ className = '', ...rest }) => <TableCell className={`${className}`} {...rest} />;
const CustomButton = ({ className = '', ...rest }) => <Button className={`comp_CustomTable_TableBodyGroup___button ${className}`} {...rest} />;

function TableBodyGroupRow({ group }) {

  const { options, columns } = React.useContext(CustomTableContext);
  const [open, setOpen] = React.useState(group[get(options, 'grouped.item')].length > 0 ? true : false);

  React.useEffect(() => {
    setOpen(group[get(options, 'grouped.item')].length > 0 ? true : false);
  }, [get(options, 'grouped.item'), group[get(options, 'grouped.item')]]);

  return (
    <Droppable
      droppableId={group[get(options, 'grouped.id')]}
      direction='vertical'
    >
      {(provided, snapshot) => (
        <TableBody
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <StyledTableBodyRowGroup>
            <StyledTableBodyCell colSpan={get(columns, 'length', 0) + 1}>
              <CustomButton
                fullWidth
                size='small'
                onClick={() => setOpen(open => !open)}
              >
                {typeof (get(options, 'grouped.label')) === 'function'
                  ? options.grouped.label(group)
                  : group[get(options, 'grouped.label')]}
                {(open || snapshot.isDraggingOver)
                  ? <Icon path={mdiMenuDown} size={1} color='#44485e' />
                  : <Icon path={mdiMenuUp} size={1} color='#44485e' />}
              </CustomButton>
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
