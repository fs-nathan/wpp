import { get, remove, slice } from 'lodash';
import { LIST_ROOM, LIST_ROOM_FAIL, LIST_ROOM_RESET, LIST_ROOM_SUCCESS } from '../../constants/actions/room/listRoom';
import { SORT_ROOM, SORT_ROOM_SUCCESS } from '../../constants/actions/room/sortRoom';


export const initialState = {
  data: {
    rooms: [],
  },
  error: null,
  loading: false,
  firstTime: true,
};

function reducer(state = initialState, action) {
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
        firstTime: false,
      };
    case LIST_ROOM_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
        firstTime: false,
      };
    case LIST_ROOM_RESET:
      return initialState;
    /*
    case CREATE_ROOM_SUCCESS: {
      const newRooms = concat(state.data.rooms, get(action.data, 'room'));
      return {
        ...state,
        data: {
          rooms: newRooms,
        },
      };
    }
    case UPDATE_ROOM_SUCCESS: {
      let newRooms = state.data.rooms;
      const index = findIndex(newRooms, { id: get(action.data, 'room.id') });
      newRooms[index] = {
        ...newRooms[index],
        ...get(action.data, 'room'),
      };
      return {
        ...state,
        data: {
          rooms: newRooms,
        },
      };
    }
    case DELETE_ROOM_SUCCESS: {
      let newRooms = state.data.rooms;
      remove(newRooms, { id: get(action.options, 'roomId') });
      return {
        ...state,
        data: {
          rooms: newRooms,
        },
      };
    }
    */
    case SORT_ROOM:
    case SORT_ROOM_SUCCESS: {
      let newRooms = state.data.rooms;
      const removed = remove(newRooms, { id: get(action.options, 'roomId') });
      newRooms = [
        ...slice(newRooms, 0, action.options.sortIndex),
        ...removed,
        ...slice(newRooms, action.options.sortIndex)
      ];
      return {
        ...state,
        data: {
          rooms: newRooms,
        },
      };
    }
    default:
      return state;
  }
}

export default reducer;