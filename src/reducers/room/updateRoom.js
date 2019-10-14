import {
  UPDATE_ROOM,
  UPDATE_ROOM_SUCCESS,
  UPDATE_ROOM_FAIL,
} from '../../constants/actions/room/updateRoom';

export const initialState = {
  data: {},
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
        error: null,
        loading: false,
      };
    case UPDATE_ROOM_FAIL:
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