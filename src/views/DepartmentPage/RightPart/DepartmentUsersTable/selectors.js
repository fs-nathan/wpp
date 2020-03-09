import { createSelector } from 'reselect';
import { get, find, isArray } from 'lodash';

const detailRoom = state => state.room.detailRoom;
const getUserOfRoom = state => state.room.getUserOfRoom;
const sortUser = state => state.room.sortUser;
const getRequirementJoinGroup = state => state.groupUser.getRequirementJoinGroup;
const listPosition = state => state.position.listPosition;

export const roomSelector = createSelector(
  [detailRoom, getUserOfRoom, listPosition],
  (detailRoom, getUserOfRoom, listPosition) => {
    const { loading: sortUserLoading, error: sortUserError } = sortUser;
    const { data: { room }, loading: detailRoomLoading, error: detailRoomError } = detailRoom;
    const { data: { users }, loading: getUserOfRoomLoading, error: getUserOfRoomError } = getUserOfRoom;
    const { data: { positions } } = listPosition;  
    const newRoom = {
      ...room,
      users: (isArray(users) ? users : []).map(user => ({
        ...user,
        position: get(
          find(positions, { id: get(user, 'position_id') }),
          'name',
        )
      })),
      number_member: (isArray(users) ? users : []).length,
    }
    return {
      room: newRoom,
      loading: detailRoomLoading || getUserOfRoomLoading || sortUserLoading,
      error: detailRoomError || getUserOfRoomError || sortUserError,
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