import { DETAIL_ROOM, DETAIL_ROOM_FAIL, DETAIL_ROOM_RESET, DETAIL_ROOM_SUCCESS } from '../../constants/actions/room/detailRoom';

export const initialState = {
  data: {
    room: null,
  },
  error: null,
  loading: false,
  firstTime: true,
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
        firstTime: false,
      };
    case DETAIL_ROOM_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
        firstTime: false,
      };
    case DETAIL_ROOM_RESET:
      return initialState;
    /*
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
    */
    default:
      return state;
  }
}

export default reducer;