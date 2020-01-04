import {
  DELETE_ROOM,
  DELETE_ROOM_SUCCESS,
  DELETE_ROOM_FAIL,
} from '../../constants/actions/room/deleteRoom';

export const initialState = {
  data: {
    roomId: null,
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case DELETE_ROOM:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case DELETE_ROOM_SUCCESS: 
      return {
        ...state, 
        data: action.data,
        error: null,
        loading: false,
      };
    case DELETE_ROOM_FAIL:
      return {
        ...state,
        error: action.error,
        loadling: false,
      };
    default:
      return state;
  }
}

export default reducer;