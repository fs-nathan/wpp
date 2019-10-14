import {
  LIST_ROOM,
  LIST_ROOM_SUCCESS,
  LIST_ROOM_FAIL,
} from '../../constants/actions/room/listRoom';

export const initialState = {
  data: {
    rooms: [],  
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case LIST_ROOM:
      return {
        ...state,
        error: null,
        loading: true,
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
    default:
      return state;
  }
}

export default reducer;