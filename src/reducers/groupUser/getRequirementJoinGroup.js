import { GET_REQUIREMENT_JOIN_GROUP, GET_REQUIREMENT_JOIN_GROUP_FAIL, GET_REQUIREMENT_JOIN_GROUP_SUCCESS } from '../../constants/actions/groupUser/getRequirementJoinGroup';

export const initialState = {
  data: {
    requirements: [],
  },
  error: null,
  loading: false,
  firstTime: true,
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
        data: action.data,
        error: null,
        loading: false,
        firstTime: false,
      };
    case GET_REQUIREMENT_JOIN_GROUP_FAIL:
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