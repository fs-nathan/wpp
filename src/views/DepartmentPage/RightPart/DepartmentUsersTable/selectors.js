import { createSelector } from 'reselect';
import { get, find } from 'lodash';

const detailRoom = state => state.room.detailRoom;
const getUserOfRoom = state => state.room.getUserOfRoom;
const getRequirementJoinGroup = state => state.groupUser.getRequirementJoinGroup;
const listPosition = state => state.position.listPosition;

export const roomSelector = createSelector(
  [detailRoom, getUserOfRoom, listPosition],
  (detailRoom, getUserOfRoom, listPosition) => {
    const { data: { room }, loading: detailRoomLoading, error: detailRoomError } = detailRoom;
    const { data: { users }, loading: getUserOfRoomLoading, error: getUserOfRoomError } = getUserOfRoom;
    const { data: { positions }, loading: listPositionLoading, error: listPositionError } = listPosition;  
    const newRoom = {
      ...room,
      users: users.map(user => ({
        ...user,
        position: get(
          find(positions, { id: get(user, 'position_id') }),
          'name',
        )
      })),
      number_member: users.length,
    }
    return {
      room: newRoom,
      loading: detailRoomLoading || getUserOfRoomLoading || listPositionLoading,
      error: detailRoomError || getUserOfRoomError || listPositionError,
    }
  }
);

export const hasRequirementSelector = createSelector(
  [getRequirementJoinGroup],
  (getRequirementJoinGroup) => {
    const { data: { requirements } } = getRequirementJoinGroup;
    return requirements.length > 0;
  }
);