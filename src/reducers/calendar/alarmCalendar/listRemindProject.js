import { LIST_REMIND_PROJECT, LIST_REMIND_PROJECT_FAIL, LIST_REMIND_PROJECT_SUCCESS } from '../../../constants/actions/calendar/alarmCalendar';

export const initialState = {
  data: {
    reminds: [],
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case LIST_REMIND_PROJECT:
      return {
        ...state,
        error: null,
        loading: action.quite ? false : true,
      };
    case LIST_REMIND_PROJECT_SUCCESS:
      return {
        ...state,
        ...initialState,
        data: action.data,
        error: null,
        loading: false,
      };
    case LIST_REMIND_PROJECT_FAIL:
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