import { GET_REQUIREMENT_JOIN_GROUP, GET_REQUIREMENT_JOIN_GROUP_FAIL, GET_REQUIREMENT_JOIN_GROUP_SUCCESS } from '../../constants/actions/groupUser/getRequirementJoinGroup';

export const initialState = {
  data: {
    requirements: [],
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_REQUIREMENT_JOIN_GROUP:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case GET_REQUIREMENT_JOIN_GROUP_SUCCESS:
      return {
        ...state,
        ...initialState,
        data: action.data,
        error: null,
        loading: false,
      };
    case GET_REQUIREMENT_JOIN_GROUP_FAIL:
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