import {
  LIST_USER_OF_GROUP,
  LIST_USER_OF_GROUP_SUCCESS,
  LIST_USER_OF_GROUP_FAIL,
} from '../../constants/actions/user/listUserOfGroup';

export const initialState = {
  data: {
    rooms: [],  
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case LIST_USER_OF_GROUP:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case LIST_USER_OF_GROUP_SUCCESS: 
      return {
        ...state, 
        data: action.data,
        error: null,
        loading: false,
      };
    case LIST_USER_OF_GROUP_FAIL:
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