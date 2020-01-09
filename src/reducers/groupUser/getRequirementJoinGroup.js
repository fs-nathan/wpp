import {
  GET_REQUIREMENT_JOIN_GROUP,
  GET_REQUIREMENT_JOIN_GROUP_SUCCESS,
  GET_REQUIREMENT_JOIN_GROUP_FAIL,
} from '../../constants/actions/groupUser/getRequirementJoinGroup';

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
        data: action.data,
        error: null,
        loading: false,
      };
    case GET_REQUIREMENT_JOIN_GROUP_FAIL:
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