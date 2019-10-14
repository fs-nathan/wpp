import {
  DETAIL_ROOM,
  DETAIL_ROOM_SUCCESS,
  DETAIL_ROOM_FAIL,
} from '../../constants/actions/room/detailRoom';

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
        loading: true,
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
    default:
      return state;
  }
}

export default reducer;