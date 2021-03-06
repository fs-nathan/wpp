import { GET_LIST_GROUP, GET_LIST_GROUP_FAIL, GET_LIST_GROUP_SUCCESS } from '../../constants/actions/groupUser/getListGroup';

export const initialState = {
  data: {
    invitations: [],
  },
  error: null,
  loading: false,
  firstTime: true,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_LIST_GROUP:
      return {
        ...state,
        error: null,
        loading: action.quite ? false : true,
      };
    case GET_LIST_GROUP_SUCCESS:
      return {
        ...state,
        data: action.data,
        error: null,
        loading: false,
        firstTime: false,
      };
    case GET_LIST_GROUP_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
        firstTime: false,
      };
    default:
      return state;
  }
}

export default reducer;