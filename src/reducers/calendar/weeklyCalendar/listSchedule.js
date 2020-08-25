import { SCHEDULE_LIST, SCHEDULE_LIST_FAIL, SCHEDULE_LIST_SUCCESS } from "../../../constants/actions/calendar/weeklyCalendar";

export const initialState = {
  data: {
    calendars: [],
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SCHEDULE_LIST:
      return {
        ...state,
        error: null,
        loading: action.quite ? false : true,
      };
    case SCHEDULE_LIST_SUCCESS:
      return {
        ...state,
        ...initialState,
        data: action.data,
        error: null,
        loading: false,
      };
    case SCHEDULE_LIST_FAIL:
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