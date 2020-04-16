import { CREATE_ROOM, CREATE_ROOM_FAIL, CREATE_ROOM_SUCCESS } from '../../constants/actions/room/createRoom';

export const initialState = {
  data: {
    room: null,
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_ROOM:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case CREATE_ROOM_SUCCESS:
      return {
        ...state,
        ...initialState,
        data: action.data,
        error: null,
        loading: false,
      };
    case CREATE_ROOM_FAIL:
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