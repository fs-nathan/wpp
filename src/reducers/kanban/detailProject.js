import { KANBAN_DETAIL_PROJECT, KANBAN_DETAIL_PROJECT_RESET, KANBAN_DETAIL_PROJECT_SUCCESS, KANBAN_DETAIL_PROJECT_FAIL } from 'constants/actions/kanban/detailProject';

export const initialState = {
  data: {
    project: null,
  },
  error: null,
  loading: false,
  firstTime: true,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case KANBAN_DETAIL_PROJECT:
      return {
        ...state,
        error: null,
        loading: action.quite ? false : true,
      };
    case KANBAN_DETAIL_PROJECT_SUCCESS:
      return {
        ...state,
        data: action.data,
        error: null,
        loading: false,
        firstTime: false,
      };
    case KANBAN_DETAIL_PROJECT_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
        firstTime: false,
      };
    case KANBAN_DETAIL_PROJECT_RESET:
      return initialState;
    default:
      return state;
  }
}

export default reducer;