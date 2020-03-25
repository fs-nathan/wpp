import { concat, find, get, isArray } from 'lodash';
import { createSelector } from 'reselect';

const detailRoom = state => state.room.detailRoom;
const getUserOfRoom = state => state.room.getUserOfRoom;
const sortUser = state => state.user.sortUser;
const getRequirementJoinGroup = state => state.groupUser.getRequirementJoinGroup;
const banUserFromGroup = state => state.user.banUserFromGroup;
const listPosition = state => state.position.listPosition;
const deleteRoom = state => state.room.deleteRoom;
const publicMember = state => state.user.publicMember;
const privateMember = state => state.user.privateMember;

export const roomSelector = createSelector(
  [detailRoom, getUserOfRoom, listPosition, deleteRoom, sortUser, banUserFromGroup],
  (detailRoom, getUserOfRoom, listPosition, deleteRoom, sortUser, banUserFromGroup) => {
    const { loading: sortUserLoading, error: sortUserError } = sortUser;
    const { data: { room }, loading: detailRoomLoading, error: detailRoomError } = detailRoom;
    const { data: { users }, loading: getUserOfRoomLoading, error: getUserOfRoomError } = getUserOfRoom;
    const { data: { positions } } = listPosition;
    const { loading: deleteLoading, error: deleteError } = deleteRoom;
    const { loading: banUserLoading, error: banUserError } = banUserFromGroup;
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
      loading: detailRoomLoading || getUserOfRoomLoading || sortUserLoading || deleteLoading || banUserLoading,
      error: detailRoomError || getUserOfRoomError || sortUserError || deleteError || banUserError,
    }
  }
);

export const publicPrivatePendingsSelector = createSelector(
  [publicMember, privateMember],
  (publicMember, privateMember) => {
    const { pendings: publicPendings, error: publicError } = publicMember;
    const { pendings: privatePendings, error: privateError } = privateMember;
    return {
      pendings: concat(publicPendings, privatePendings),
      error: publicError || privateError,
    }
  }
)

export const hasRequirementSelector = createSelector(
  [getRequirementJoinGroup],
  (getRequirementJoinGroup) => {
    const { data: { requirements } } = getRequirementJoinGroup;
    return requirements.length > 0;
  }
);