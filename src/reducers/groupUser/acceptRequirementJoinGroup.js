import { ACCEPT_REQUIREMENT_JOIN_GROUP, ACCEPT_REQUIREMENT_JOIN_GROUP_FAIL, ACCEPT_REQUIREMENT_JOIN_GROUP_SUCCESS } from '../../constants/actions/groupUser/acceptRequirementJoinGroup';

export const initialState = {
  data: {},
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case ACCEPT_REQUIREMENT_JOIN_GROUP:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case ACCEPT_REQUIREMENT_JOIN_GROUP_SUCCESS:
      return {
        ...state,
        ...initialState,
        error: null,
        loading: false,
      };
    case ACCEPT_REQUIREMENT_JOIN_GROUP_FAIL:
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