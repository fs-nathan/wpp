import { createSelector } from 'reselect';
import { find, get } from 'lodash';

const listRoom = state => state.room.listRoom;
const listUserOfGroup = state => state.user.listUserOfGroup;
const getRequirementJoinGroup = state => state.groupUser.getRequirementJoinGroup;
const listPosition = state => state.position.listPosition;

export const roomsSelector = createSelector(
  [listRoom, listUserOfGroup, listPosition],
  (listRoom, listUserOfGroup, listPosition) => {
    const { data: { rooms }, loading: listRoomLoading, error: listRoomError } = listRoom;
    const { data: { rooms: group }, error: listUserOfGroupError, loading: listUserOfGroupLoading } = listUserOfGroup;
    const { data: { positions }, loading: listPositionLoading, error: listPositionError } = listPosition;  
    const newRooms = group.map(curGroup => ({
      ...curGroup,
      ...find(rooms, { 'id': get(curGroup, 'id') }),
      number_member: get(curGroup, 'users', []).length,
      users: get(curGroup, 'users', [])
        .map(user => ({
          ...user,
          position: get(
            find(positions, { id: get(user, 'position_id') }),
            'name',
          )
        })),
    }));
    return {
      rooms: newRooms,
      loading: listRoomLoading || listUserOfGroupLoading || listPositionLoading,
      error: listRoomError || listUserOfGroupError || listPositionError,
    }
  }
) 

export const maxUserSelector = createSelector(
  [listUserOfGroup],
  (listUserOfGroup) => {
    const { data: {  maxUser } } = listUserOfGroup;
    return maxUser;
  }
)

export const hasRequirementSelector = createSelector(
  [getRequirementJoinGroup],
  (getRequirementJoinGroup) => {
    const { data: { requirements } } = getRequirementJoinGroup;
    return requirements.length > 0;
  }
)