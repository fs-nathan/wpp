import React from 'react';
import styled from 'styled-components';
import { TableRow, TableCell, TableBody, Button } from '@material-ui/core';
import { Droppable } from 'react-beautiful-dnd';
import Icon from '@mdi/react';
import {
  mdiChevronUp,
  mdiChevronDown,
} from '@mdi/js';
import TableBodyRow from './TableBodyRow';
import _ from 'lodash';

const StyledTableBodyRow = styled(({ show, ...rest }) => <TableRow {...rest} />)`
  background-color: ${props => props.show ? 'rgba(0, 0, 0, .1)' : '#fff'};
`;

const StyledTableBodyCell = styled(TableCell)`
  padding: 0;
`;

const CustomButton = styled(Button)`
  justify-content: flex-start;
  border-radius: 0;
`;

function TableBodyRowGroup({ room, searchPatern = '' }) {

  const _users = _.get(room, 'users', []);
  const [users, setUsers] = React.useState([]);
  
  React.useEffect(() => {
    setUsers(_.filter(_users, user => {
      for (const key in user) {
        if (
          user.hasOwnProperty(key) &&
          _.includes(user[key], searchPatern)
        ) return true;
      }
      return false;
    }));
  }, [searchPatern, _users]);

  const [show, setShow] = React.useState(true);

  return (
    <Droppable droppableId={_.get(room, 'id', '')}>
      {(provided, snapshot) => (
        <TableBody
          innerRef={provided.innerRef}
          {...provided.droppableProps}
        >
          <StyledTableBodyRow show={show || snapshot.isDraggingOver}>
            <StyledTableBodyCell colSpan={10}>
              <CustomButton 
                fullWidth 
                onClick={() => setShow(!show)}
                startIcon={
                  (show || snapshot.isDraggingOver)
                  ? <Icon path={mdiChevronDown} size={1} />
                  : <Icon path={mdiChevronUp} size={1} />
                }  
              >
                {_.get(room, 'name', '')}
              </CustomButton>
            </StyledTableBodyCell>
          </StyledTableBodyRow>
          {(show || snapshot.isDraggingOver) && users.map((user, index) => (
            <TableBodyRow key={index} user={user} index={index} departmentId={_.get(room, 'id', '')} />
          ))}
          {provided.placeholder}  
        </TableBody>
      )}
    </Droppable>
  )
}

export default TableBodyRowGroup;
