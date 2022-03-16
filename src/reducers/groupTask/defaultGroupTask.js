import {
  DEFAULT_GROUP_TASK,
  DEFAULT_GROUP_TASK_SUCCESS,
  DEFAULT_GROUP_TASK_FAIL,
} from "../../constants/actions/groupTask/defaultGroupTask";

export const initialState = {
  data: {
    idDefaultGroupTask: "",
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_GROUP_TASK:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case DEFAULT_GROUP_TASK_SUCCESS:
      return {
        ...state,
        ...initialState,
        data: action.payload,
        error: null,
        loading: false,
      };
    case DEFAULT_GROUP_TASK_FAIL:
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
