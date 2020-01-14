import {
  REJECT_REQUIREMENT_JOIN_GROUP,
  REJECT_REQUIREMENT_JOIN_GROUP_SUCCESS,
  REJECT_REQUIREMENT_JOIN_GROUP_FAIL,
} from '../../constants/actions/groupUser/rejectRequirementJoinGroup';

export const initialState = {
  data: {},
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case REJECT_REQUIREMENT_JOIN_GROUP:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case REJECT_REQUIREMENT_JOIN_GROUP_SUCCESS: 
      return {
        ...state,
        error: null,
        loading: false,
      };
    case REJECT_REQUIREMENT_JOIN_GROUP_FAIL:
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