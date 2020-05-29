import { findIndex, get, remove, slice } from 'lodash';
import { SORT_ROOM_SUCCESS } from '../../../constants/actions/room/sortRoom';
import { LIST_USER_OF_GROUP, LIST_USER_OF_GROUP_FAIL, LIST_USER_OF_GROUP_RESET, LIST_USER_OF_GROUP_SUCCESS } from '../../../constants/actions/user/listUserOfGroup';
import { PRIVATE_MEMBER_SUCCESS } from '../../../constants/actions/user/privateMember';
import { PUBLIC_MEMBER_SUCCESS } from '../../../constants/actions/user/publicMember';
import { SORT_USER, SORT_USER_SUCCESS } from '../../../constants/actions/user/sortUser';

export const initialState = {
  data: {
    rooms: [],
    maxUser: 0,
  },
  error: null,
  loading: false,
  firstTime: true,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case LIST_USER_OF_GROUP:
      return {
        ...state,
        error: null,
        loading: action.quiet ? false : true,
      };
    case LIST_USER_OF_GROUP_SUCCESS:
      return {
        ...state,
        data: action.data,
        error: null,
        loading: false,
        firstTime: false,
      };
    case LIST_USER_OF_GROUP_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
        firstTime: false,
      };
    case LIST_USER_OF_GROUP_RESET:
      return initialState;
    /*
    case UPDATE_USER_SUCCESS: {
      let updatedUser = null;
      let newRooms = state.data.rooms;
      newRooms.forEach(room => {
        let users = get(room, 'users', []);
        if (find(
          users,
          { id: get(action.options, 'userId') }
        )) {
          updatedUser = find(
            users,
            { id: get(action.options, 'userId') }
          );
        }
      });
      if (get(updatedUser, 'room') === get(action.options, 'roomId')) {
        const index = findIndex(newRooms, { id: get(updatedUser, 'room') });
        let users = get(newRooms[index], 'users', []);
        const u_index = findIndex(users, { id: get(updatedUser, 'id') });
        users[u_index] = {
          ...users[u_index],
          position_id: get(action.options, 'positionId'),
          level_id: get(action.options, 'levelId'),
          major_id: get(action.options, 'majorId'),
          description: get(action.options, 'description'),
        }
        newRooms[index] = {
          ...newRooms[index],
          users,
        }
      } else {
        let index = findIndex(newRooms, { id: get(updatedUser, 'room') });
        let users = get(newRooms[index], 'users', []);
        remove(users, { id: get(updatedUser, 'id') });
        newRooms[index] = {
          ...newRooms[index],
          users,
        }
        index = findIndex(newRooms, { id: get(action.options, 'roomId') });
        users = [...get(newRooms[index], 'users', []), {
          ...updatedUser,
          position_id: get(action.options, 'positionId'),
          level_id: get(action.options, 'levelId'),
          major_id: get(action.options, 'majorId'),
          description: get(action.options, 'description'),
        }];
        newRooms[index] = {
          ...newRooms[index],
          users,
        }
      }
      return {
        ...state,
        data: {
          ...state.data,
          rooms: newRooms,
        },
      };
    }
    */
    case PUBLIC_MEMBER_SUCCESS: {
      let newRooms = state.data.rooms.map(room => {
        let users = get(room, 'users', []);
        let index = findIndex(users, { id: get(action.options, 'userId') });
        if (index > -1) {
          users[index] = {
            ...users[index],
            state: 1,
          };
        };
        return ({
          ...room,
          users,
        });
      });
      return {
        ...state,
        data: {
          ...state.data,
          rooms: newRooms,
        },
      };
    }
    case PRIVATE_MEMBER_SUCCESS: {
      let newRooms = state.data.rooms.map(room => {
        let users = get(room, 'users', []);
        let index = findIndex(users, { id: get(action.options, 'userId') });
        if (index > -1) {
          users[index] = {
            ...users[index],
            state: 0,
          };
        };
        return ({
          ...room,
          users,
        });
      });
      return {
        ...state,
        data: {
          ...state.data,
          rooms: newRooms,
        },
      };
    }
    case SORT_USER:
    case SORT_USER_SUCCESS: {
      let removed = [];
      let newRooms = state.data.rooms.map(room => {
        let users = get(room, 'users', []);
        if (findIndex(users, { id: get(action.options, 'userId') }) > -1)
          removed = remove(users, { id: get(action.options, 'userId') });
        return ({
          ...room,
          users,
        });
      });
      newRooms = newRooms.map(room => {
        let users = get(room, 'users', []);
        if (get(action.options, 'roomId') === get(room, 'id')) {
          users = [...slice(users, 0, action.options.sortIndex), ...removed, ...slice(users, action.options.sortIndex)];
        };
        return ({
          ...room,
          users,
        });
      });
      return {
        ...state,
        data: {
          ...state.data,
          rooms: newRooms,
        },
      };
    }
    case SORT_ROOM_SUCCESS: {
      let newRooms = state.data.rooms;
      const removed = remove(newRooms, { id: get(action.options, 'roomId') });
      newRooms = [
        ...slice(newRooms, 0, get(action.options, 'sortIndex')),
        ...removed,
        ...slice(newRooms, get(action.options, 'sortIndex'))
      ];
      return {
        ...state,
        data: {
          ...state.data,
          rooms: newRooms,
        },
      };
    }
    default:
      return state;
  }
}

export default reducer;
