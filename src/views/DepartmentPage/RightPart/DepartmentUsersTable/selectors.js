import { concat, find, get, isArray } from 'lodash';
import { createSelector } from 'reselect';

const detailRoom = state => state.room.detailRoom;
const getUserOfRoom = state => state.room.getUserOfRoom;
const sortUser = state => state.user.sortUser;
const getRequirementJoinGroup = state => state.groupUser.getRequirementJoinGroup;
const listPosition = state => state.position.listPosition;
const publicMember = state => state.user.publicMember;
const privateMember = state => state.user.privateMember;

export const roomSelector = createSelector(
  [detailRoom, getUserOfRoom, listPosition, sortUser],
  (detailRoom, getUserOfRoom, listPosition, sortUser) => {
    const { loading: sortUserLoading, error: sortUserError } = sortUser;
    const { data: { room }, loading: detailRoomLoading, error: detailRoomError, firstTime: detailFirst } = detailRoom;
    const { data: { users }, loading: getUserOfRoomLoading, error: getUserOfRoomError, firstTime: getUserFirst } = getUserOfRoom;
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
      loading: (detailFirst ? false : detailRoomLoading) || (getUserFirst ? false : getUserOfRoomLoading) || sortUserLoading,
      error: detailRoomError || getUserOfRoomError || sortUserError,
      firstTime: detailFirst && getUserFirst,
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