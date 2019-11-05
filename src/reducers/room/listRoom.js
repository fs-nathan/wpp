import {
  LIST_ROOM,
  LIST_ROOM_SUCCESS,
  LIST_ROOM_FAIL,
} from '../../constants/actions/room/listRoom';
import {
  CREATE_ROOM_SUCCESS,
} from '../../constants/actions/room/createRoom';
import {
  UPDATE_ROOM, 
  UPDATE_ROOM_SUCCESS,
} from '../../constants/actions/room/updateRoom';
import {
  DELETE_ROOM,
} from '../../constants/actions/room/deleteRoom';
import { 
  SORT_ROOM 
} from '../../constants/actions/room/sortRoom';

import { concat, findIndex, get, remove, slice } from 'lodash';
  
export const initialState = {
  data: {
    rooms: [],  
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  let rooms = [];
  let index = -1;
  switch (action.type) {
    case LIST_ROOM:
      return {
        ...state,
        error: null,
        loading: action.quite ? false : true,
      };
    case LIST_ROOM_SUCCESS: 
      return {
        ...state, 
        data: action.data,
        error: null,
        loading: false,
      };
    case LIST_ROOM_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case CREATE_ROOM_SUCCESS:
      rooms = concat([...state.data.rooms], action.data.room);
      return {
        ...state,
        data: {
          rooms,
        },
      };
    case UPDATE_ROOM:
      rooms = [...state.data.rooms];
      index = findIndex(rooms, { id: get(action.options, 'roomId') });
      rooms[index] = {
        ...rooms[index],
        ...action.options,
      };
      return {
        ...state,
        data: {
          rooms,
        },
      };
    case UPDATE_ROOM_SUCCESS:
      rooms = [...state.data.rooms];
      index = findIndex(rooms, { id: get(action.data.room, 'id') });
      rooms[index] = {
        ...rooms[index],
        ...action.data.room,
      };
      return {
        ...state,
        data: {
          rooms,
        },
      };
    case DELETE_ROOM:
      rooms = [...state.data.rooms];
      remove(rooms, { id: get(action.options, 'roomId') });
      return {
        ...state,
        data: {
          rooms,
        },
      };    
    case SORT_ROOM: 
      rooms = [...state.data.rooms];
      let removed = remove(rooms, { id: get(action.options, 'roomId') });
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