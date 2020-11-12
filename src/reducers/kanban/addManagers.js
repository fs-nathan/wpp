import { KANBAN_ADD_MANAGERS, KANBAN_ADD_MANAGERS_RESET, KANBAN_ADD_MANAGERS_SUCCESS, KANBAN_ADD_MANAGERS_FAIL } from 'constants/actions/kanban/addManagers';

export const initialState = {
  error: null,
  loading: false,
  firstTime: true,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case KANBAN_ADD_MANAGERS:
      return {
        ...state,
        error: null,
        loading: action.quite ? false : true,
      };
    case KANBAN_ADD_MANAGERS_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        firstTime: false,
      };
    case KANBAN_ADD_MANAGERS_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
        firstTime: false,
      };
    case KANBAN_ADD_MANAGERS_RESET:
      return initialState;
    default:
      return state;
  }
}

export default reducer;