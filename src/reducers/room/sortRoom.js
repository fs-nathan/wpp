import { SORT_ROOM, SORT_ROOM_FAIL, SORT_ROOM_SUCCESS } from '../../constants/actions/room/sortRoom';

export const initialState = {
  data: {},
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SORT_ROOM:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case SORT_ROOM_SUCCESS:
      return {
        ...state,
        ...initialState,
        data: action.data,
        error: null,
        loading: false,
      };
    case SORT_ROOM_FAIL:
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