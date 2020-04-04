import { get } from 'lodash';
import { DETAIL_ROOM, DETAIL_ROOM_FAIL, DETAIL_ROOM_SUCCESS } from '../../constants/actions/room/detailRoom';
import { UPDATE_ROOM_SUCCESS } from '../../constants/actions/room/updateRoom';

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
        ...initialState,
        data: action.data,
        error: null,
        loading: false,
      };
    case DETAIL_ROOM_FAIL:
      return {
        ...state,
        ...initialState,
        error: action.error,
        loading: false,
      };
    case UPDATE_ROOM_SUCCESS: {
      let newRoom = state.data.room;
      if (get(newRoom, 'id') === get(action.data, 'room.id')) {
        newRoom = {
          ...newRoom,
          ...get(action.data, 'room'),
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