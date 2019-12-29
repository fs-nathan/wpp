import {
  ASSIGN_MEMBER_TO_ALL_TASK,
  ASSIGN_MEMBER_TO_ALL_TASK_SUCCESS,
  ASSIGN_MEMBER_TO_ALL_TASK_FAIL,
} from '../../constants/actions/project/assignMemberToAllTask';

export const initialState = {
  data: {},
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case ASSIGN_MEMBER_TO_ALL_TASK:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case ASSIGN_MEMBER_TO_ALL_TASK_SUCCESS: 
      return {
        ...state, 
        error: null,
        loading: false,
      };
    case ASSIGN_MEMBER_TO_ALL_TASK_FAIL:
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