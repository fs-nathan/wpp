import React from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import TableBodyRow from './TableBodyRow';
import TableHeaderRow from './TableHeaderRow';
import { connect } from 'react-redux';
import { getUserOfRoom } from '../../../../../actions/room/getUserOfRoom';
import { sortUser } from '../../../../../actions/user/sortUser';
import { useParams } from 'react-router-dom';
import LoadingBox from '../../../../../components/LoadingBox';
import ErrorBox from '../../../../../components/ErrorBox';
import ColorTypo from '../../../../../components/ColorTypo';
import { CustomEventListener, CustomEventDispose, SORT_USER } from '../../../../../constants/events';
import _ from 'lodash';

function TableMain({ getUserOfRoom, doGetUserOfRoom, sortUser, doSortUser, searchPatern = '' }) {

  const { departmentId } = useParams();
  const { data: { users: _users }, error: getUserOfRoomError, loading: getUserOfRoomLoading } = getUserOfRoom;
  const { error: sortUserError, loading: sortUserLoading } = sortUser;
  const loading = getUserOfRoomLoading || sortUserLoading;
  const error = getUserOfRoomError || sortUserError;
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

  React.useEffect(() => {
    doGetUserOfRoom({
      roomId: departmentId,
    });
  }, [doGetUserOfRoom, departmentId]);

  React.useEffect(() => {
    const doGetUserOfRoomHandler = () => {
      doGetUserOfRoom({
        roomId: departmentId,
      });
    };
    
    CustomEventListener(SORT_USER, doGetUserOfRoomHandler);

    return () => {
      CustomEventDispose(SORT_USER, doGetUserOfRoomHandler);
    }
  }, [doGetUserOfRoom, departmentId]);

  function onDragEnd(result) {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return;
    doSortUser({
      userId: draggableId,
      roomId: destination.droppableId,
      sortIndex: destination.index,
    });
  }

  return (
    <React.Fragment>
      {loading && <LoadingBox />}
      {error !== null && <ErrorBox />}
      {!loading && error === null && (
        <Table>
          <TableHead>
            <TableHeaderRow />
          </TableHead>
          {_.get(users, 'length', 0) === 0 
            ? (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={10}>
                    <ColorTypo uppercase color='gray'>
                      Không có dữ liệu
                    </ColorTypo>
                  </TableCell>
                </TableRow>
              </TableBody>
            )
            : (
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId={departmentId}>
                  {provided => (
                    <TableBody
                      innerRef={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {users.map((user, index) => (
                        <TableBodyRow key={index} user={user} index={index} />  
                      ))}
                      {provided.placeholder}
                    </TableBody>
                  )}
                </Droppable>
              </DragDropContext>
            )}
        </Table>
      )}
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    getUserOfRoom: state.room.getUserOfRoom,
    sortUser: state.user.sortUser,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    doGetUserOfRoom: ({ roomId }) => dispatch(getUserOfRoom({ roomId })),
    doSortUser: ({ roomId, userId, sortIndex }) => dispatch(sortUser({ roomId, userId, sortIndex })),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TableMain);
