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
  let room = null;
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
    case UPDATE_ROOM: 
      room = {
        ...state.data.room,
      };
      if (get(state.data.room, 'id') === get(action.option, 'roomId')) {
        room = {
          ...room,
          ...action.options,
        }
      }
      return {
        ...state, 
        data: {
          room,
        },
      };
    case UPDATE_ROOM_SUCCESS:
      room = {
        ...state.data.room,
      };
      if (get(state.data.room, 'id') === get(action.data.room, 'id')) {
        room = {
          ...room,
          ...action.data.room,
        }
      }
      return {
        ...state,
        data: {
          room,
        },
      };
    case DETAIL_ROOM_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
}

export default reducer;