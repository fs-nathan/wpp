import { KANBAN_GET_MANAGER, KANBAN_GET_MANAGER_RESET, KANBAN_GET_MANAGER_SUCCESS, KANBAN_GET_MANAGER_FAIL } from 'constants/actions/kanban/getManager';

export const initialState = {
  data: {
    managers: [],
  },
  error: null,
  loading: false,
  firstTime: true,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case KANBAN_GET_MANAGER:
      return {
        ...state,
        error: null,
        loading: action.quite ? false : true,
      };
    case KANBAN_GET_MANAGER_SUCCESS:
      return {
        ...state,
        data: action.data,
        error: null,
        loading: false,
        firstTime: false,
      };
    case KANBAN_GET_MANAGER_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
        firstTime: false,
      };
    case KANBAN_GET_MANAGER_RESET:
      return initialState;
    default:
      return state;
  }
}

export default reducer;