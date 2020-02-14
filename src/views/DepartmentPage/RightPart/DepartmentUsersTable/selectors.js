import { createSelector } from 'reselect';

const detailRoom = state => state.room.detailRoom;
const getUserOfRoom = state => state.room.getUserOfRoom;
const getRequirementJoinGroup = state => state.groupUser.getRequirementJoinGroup;

export const roomSelector = createSelector(
  [detailRoom, getUserOfRoom],
  (detailRoom, getUserOfRoom) => {
    const { data: { room }, loading: detailRoomLoading, error: detailRoomError } = detailRoom;
    const { data: { users }, loading: getUserOfRoomLoading, error: getUserOfRoomError } = getUserOfRoom;
    const newRoom = {
      ...room,
      users,
      number_member: users.length,
    }
    return {
      room: newRoom,
      loading: detailRoomLoading || getUserOfRoomLoading,
      error: detailRoomError || getUserOfRoomError,
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