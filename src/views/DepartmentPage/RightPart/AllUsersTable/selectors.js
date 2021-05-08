import { concat, find, get } from 'lodash';
import { createSelector } from 'reselect';

const listRoom = state => state.room.listRoom;
const listUserOfGroup = state => state.user.listUserOfGroup;
const sortUser = state => state.user.sortUser;
const getRequirementJoinGroup = state => state.groupUser.getRequirementJoinGroup;
const listPosition = state => state.position.listPosition;
const publicMember = state => state.user.publicMember;
const privateMember = state => state.user.privateMember;

export const roomsSelector = createSelector(
  [listRoom, listUserOfGroup, listPosition, sortUser],
  (listRoom, listUserOfGroup, listPosition, sortUser) => {
    const { loading: sortUserLoading, error: sortUserError } = sortUser;
    const { data: { rooms } } = listRoom;
    const { data_filter: { rooms: group }, error: listUserOfGroupError, loading: listUserOfGroupLoading, firstTime: listFirst } = listUserOfGroup;
    const { data: { positions } } = listPosition;
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
      loading: (listFirst ? false : listUserOfGroupLoading) || sortUserLoading,
      error: listUserOfGroupError || sortUserError,
      firstTime: listFirst,
    }
  }
)

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

export const maxUserSelector = createSelector(
  [listUserOfGroup],
  (listUserOfGroup) => {
    const { data: { maxUser } } = listUserOfGroup;
    return maxUser;
  }
)

export const hasRequirementSelector = createSelector(
  [getRequirementJoinGroup],
  (getRequirementJoinGroup) => {
    const { data: { requirements } } = getRequirementJoinGroup;
    return requirements.length;
  }
)