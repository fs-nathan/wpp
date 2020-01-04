import {
  LIST_USER_OF_GROUP,
  LIST_USER_OF_GROUP_SUCCESS,
  LIST_USER_OF_GROUP_FAIL,
} from '../../constants/actions/user/listUserOfGroup';
import { UPDATE_USER } from '../../constants/actions/user/updateUser';
import { SORT_USER } from '../../constants/actions/user/sortUser';
import { get, findIndex, remove, slice } from 'lodash';
import { PUBLIC_MEMBER } from '../../constants/actions/user/publicMember';
import { PRIVATE_MEMBER } from '../../constants/actions/user/privateMember';
import { SORT_ROOM } from '../../constants/actions/room/sortRoom';

export const initialState = {
  data: {
    rooms: [],  
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  let rooms = [];
  let removed = [];
  switch (action.type) {
    case LIST_USER_OF_GROUP:
      return {
        ...state,
        error: null,
        loading: action.quite ? false : true,
      };
    case LIST_USER_OF_GROUP_SUCCESS: 
      return {
        ...state, 
        data: action.data,
        error: null,
        loading: false,
      };
    case LIST_USER_OF_GROUP_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case UPDATE_USER: 
      rooms = [...state.data.rooms].map(room => {
        let users = get(room, 'users', []);
        let index = findIndex(users, { id: get(action.options, 'userId') });
        users[index] = {
          ...users[index],
          ...action.options,
        };
        return ({
          ...room,
          users,
        });
      });
      return {
        ...state,
        data: { 
          rooms,
        },
      };
    case PUBLIC_MEMBER:
      rooms = [...state.data.rooms].map(room => {
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
          rooms,
        },
      };
    case PRIVATE_MEMBER:
      rooms = [...state.data.rooms].map(room => {
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
          rooms,
        },
      };
    case SORT_USER:
      rooms = [...state.data.rooms].map(room => {
        let users = get(room, 'users', []);
        if (findIndex(users, { id: get(action.options, 'userId') }) > -1)
          removed = remove(users, { id: get(action.options, 'userId') });
        return ({
          ...room,
          users,
        });
      });
      rooms = rooms.map(room => {
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
          rooms,
        },
      };
    case SORT_ROOM: 
      rooms = [...state.data.rooms];
      removed = remove(rooms, { id: get(action.options, 'roomId') });
      rooms = [...slice(rooms, 0, action.options.sortIndex), ...removed, ...slice(rooms, action.options.sortIndex)];
      return {
        ...state,
        data: {
          rooms,
        },
      };
    default:
      return state;
  }
}

export default reducer;