import React from 'react';
import { useTranslation } from 'react-i18next';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import { DragDropContext } from 'react-beautiful-dnd';
import TableBodyGroupRow from './TableBodyGroupRow';
import TableHeaderRow from './TableHeaderRow';
import { connect } from 'react-redux';
import { listUserOfGroup } from '../../../../../actions/user/listUserOfGroup';
import { sortUser } from '../../../../../actions/user/sortUser';
import _ from 'lodash';
import ColorTypo from '../../../../../components/ColorTypo';
import LoadingBox from '../../../../../components/LoadingBox';
import ErrorBox from '../../../../../components/ErrorBox';
import { 
  CustomEventListener, CustomEventDispose, 
  SORT_USER, CREATE_ROOM, SORT_ROOM, 
  PUBLIC_MEMBER, PRIVATE_MEMBER, 
  INVITE_USER_JOIN_GROUP, BAN_USER_FROM_GROUP,
} from '../../../../../constants/events';
 
function TableMain({ listUserOfGroup, doListUserOfGroup, sortUser, doSortUser, searchPatern = '' }) {

  const { t } = useTranslation();
  const { data: { rooms }, error: listUserOfGroupError, loading: listUserOfGroupLoading } = listUserOfGroup;
  const { error: sortUserError, loading: sortUserLoading } = sortUser;

  const loading = listUserOfGroupLoading || sortUserLoading;
  const error = listUserOfGroupError || sortUserError;

  React.useEffect(() => {
    doListUserOfGroup();
  }, [doListUserOfGroup]);

  React.useEffect(() => {
    const doListUserOfGroupHandler = () => {
      doListUserOfGroup();
    };
    
    CustomEventListener(SORT_USER, doListUserOfGroupHandler);
    CustomEventListener(CREATE_ROOM, doListUserOfGroupHandler);
    CustomEventListener(SORT_ROOM, doListUserOfGroupHandler);
    CustomEventListener(PUBLIC_MEMBER, doListUserOfGroupHandler);
    CustomEventListener(PRIVATE_MEMBER, doListUserOfGroupHandler);
    CustomEventListener(INVITE_USER_JOIN_GROUP, doListUserOfGroupHandler);
    CustomEventListener(BAN_USER_FROM_GROUP, doListUserOfGroupHandler);
    
    return () => {
      CustomEventDispose(SORT_USER, doListUserOfGroupHandler);
      CustomEventDispose(CREATE_ROOM, doListUserOfGroupHandler);
      CustomEventDispose(SORT_ROOM, doListUserOfGroupHandler);
      CustomEventDispose(PUBLIC_MEMBER, doListUserOfGroupHandler);
      CustomEventDispose(PRIVATE_MEMBER, doListUserOfGroupHandler);
      CustomEventDispose(INVITE_USER_JOIN_GROUP, doListUserOfGroupHandler);
      CustomEventDispose(BAN_USER_FROM_GROUP, doListUserOfGroupHandler);
    }
  }, [doListUserOfGroup]);

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
          {_.get(rooms, 'length', 0) === 0
            ? (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={10}>
                    <ColorTypo uppercase color='gray'>{t('views.user_page.right_part.users_table.table_main.no_data_label')}</ColorTypo>
                  </TableCell>
                </TableRow>
              </TableBody>
            )
            : (
              <DragDropContext onDragEnd={onDragEnd}>
                {rooms.map((room, index) => {
                  return (
                    <TableBodyGroupRow room={room} key={_.get(room, 'id', '')} searchPatern={searchPatern} />
                  );
                })}
              </DragDropContext>  
            )}
        </Table>
      )}
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    __event__: state.__event__,
    listUserOfGroup: state.user.listUserOfGroup,
    sortUser: state.user.sortUser,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    doListUserOfGroup: () => dispatch(listUserOfGroup()),
    doSortUser: ({ roomId, userId, sortIndex }) => dispatch(sortUser({ roomId, userId, sortIndex })),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TableMain);
