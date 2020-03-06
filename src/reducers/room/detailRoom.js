import {
  DETAIL_ROOM,
  DETAIL_ROOM_SUCCESS,
  DETAIL_ROOM_FAIL,
} from '../../constants/actions/room/detailRoom';
import {
  UPDATE_ROOM,
  UPDATE_ROOM_SUCCESS,
} from '../../constants/actions/room/updateRoom';
import { get } from 'lodash';

export const initialState = {
  data: {
    room: null,  
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case DETAIL_ROOM:
      return {
        ...state,
        error: null,
        loading: action.quite ? false : true,
      };
    case DETAIL_ROOM_SUCCESS: 
      return {
        ...state, 
        data: action.data,
        error: null,
        loading: false,
      };
    case DETAIL_ROOM_FAIL: 
      return {
        ...state, 
        error: action.error,
        loading: false,
      };
    case UPDATE_ROOM_SUCCESS: {
      let newRoom = state.data.room;
      if (get(newRoom, 'id') === get(action.data, 'room.id')) {
        newRoom = {
          ...newRoom,
          ...get(action.data, 'room.id'),
        }
      }
      return {
        ...state,
        data: {
          room: newRoom,
        },
      };
    }
    default:
      return state;
  }
}

export default reducer;