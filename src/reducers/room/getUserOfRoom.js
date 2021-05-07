import { findIndex, get, remove, slice } from 'lodash';
import { FILTER_USER_OF_GROUP_SUCCESS, GET_USER_OF_ROOM, GET_USER_OF_ROOM_FAIL, GET_USER_OF_ROOM_RESET, GET_USER_OF_ROOM_SUCCESS } from '../../constants/actions/room/getUserOfRoom';
import { PRIVATE_MEMBER } from '../../constants/actions/user/privateMember';
import { PUBLIC_MEMBER } from '../../constants/actions/user/publicMember';
import { SORT_USER } from '../../constants/actions/user/sortUser';

export const initialState = {
  data: {
    users: [],
  },
  data_filter: {
    users: [],
  },
  error: null,
  loading: false,
  firstTime: true,
};

function reducer(state = initialState, action) {
  let users = [];
  let index = -1;
  switch (action.type) {
    case GET_USER_OF_ROOM:
      return {
        ...state,
        error: null,
        loading: action.quite ? false : true,
      };
    case GET_USER_OF_ROOM_SUCCESS:
      return {
        ...state,
        data: action.data,
        data_filter: action.data,
        error: null,
        loading: false,
        firstTime: false,
      };
    case FILTER_USER_OF_GROUP_SUCCESS:
       return {
        ...state,
        data_filter: action.data,
        error: null,
        loading: false,
        firstTime: false,
       }
    case GET_USER_OF_ROOM_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
        firstTime: false,
      };
    case GET_USER_OF_ROOM_RESET:
      return initialState;
    case PUBLIC_MEMBER:
      users = [...state.data.users];
      index = findIndex(users, { id: get(action.options, 'userId') });
      if (index > -1) {
        users[index] = {
          ...users[index],
          state: 1,
        };
      }
      return {
        ...state,
        data: {
          users,
        },
      };
    case PRIVATE_MEMBER:
      users = [...state.data.users];
      index = findIndex(users, { id: get(action.options, 'userId') });
      if (index > -1) {
        users[index] = {
          ...users[index],
          state: 0,
        };
      }
      return {
        ...state,
        data: {
          users,
        },
      };
    case SORT_USER:
      users = [...state.data.users];
      let removed = remove(users, { id: get(action.options, 'userId') });
      users = [...slice(users, 0, action.options.sortIndex), ...removed, ...slice(users, action.options.sortIndex)];
      return {
        ...state,
        data: {
          users,
        },
      };
    default:
      return state;
  }
}

export default reducer;