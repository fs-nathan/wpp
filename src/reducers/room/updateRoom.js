import { UPDATE_ROOM, UPDATE_ROOM_FAIL, UPDATE_ROOM_SUCCESS } from '../../constants/actions/room/updateRoom';

export const initialState = {
  data: {
    room: null,
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_ROOM:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case UPDATE_ROOM_SUCCESS:
      return {
        ...state,
        ...initialState,
        data: action.data,
        error: null,
        loading: false,
      };
    case UPDATE_ROOM_FAIL:
      return {
        ...state,
        ...initialState,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
}

export default reducer;