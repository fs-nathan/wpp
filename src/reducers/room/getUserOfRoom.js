import {
  GET_USER_OF_ROOM,
  GET_USER_OF_ROOM_SUCCESS,
  GET_USER_OF_ROOM_FAIL,
} from '../../constants/actions/room/getUserOfRoom';

export const initialState = {
  data: {
    users: [],  
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_OF_ROOM:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case GET_USER_OF_ROOM_SUCCESS: 
      return {
        ...state, 
        data: action.data,
        error: null,
        loading: false,
      };
    case GET_USER_OF_ROOM_FAIL:
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