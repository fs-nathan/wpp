import { createSelector } from 'reselect';
import { find, get } from 'lodash';

const listRoom = state => state.room.listRoom;
const listUserOfGroup = state => state.user.listUserOfGroup;
const getRequirementJoinGroup = state => state.groupUser.getRequirementJoinGroup;

export const roomsSelector = createSelector(
  [listRoom, listUserOfGroup],
  (listRoom, listUserOfGroup) => {
    const { data: { rooms }, loading: listRoomLoading, error: listRoomError } = listRoom;
    const { data: { rooms: group }, error: listUserOfGroupError, loading: listUserOfGroupLoading } = listUserOfGroup;
    const newRooms = group.map(curGroup => {
      const curRoom = find(rooms, { 'id': get(curGroup, 'id') });
      const mixedData = {
        ...curGroup,
        ...curRoom,
        number_member: get(curGroup, 'users', []).length
      }
      return mixedData;
    });
    return {
      rooms: newRooms,
      loading: listRoomLoading || listUserOfGroupLoading,
      error: listRoomError || listUserOfGroupError,
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