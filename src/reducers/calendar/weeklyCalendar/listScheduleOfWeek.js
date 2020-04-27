import { SCHEDULE_OF_WEEK_LIST, SCHEDULE_OF_WEEK_LIST_FAIL, SCHEDULE_OF_WEEK_LIST_SUCCESS } from "../../../constants/actions/calendar/weeklyCalendar";

export const initialState = {
  data: {
    schedules: [],
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SCHEDULE_OF_WEEK_LIST:
      return {
        ...state,
        error: null,
        loading: action.quite ? false : true,
      };
    case SCHEDULE_OF_WEEK_LIST_SUCCESS:
      return {
        ...state,
        ...initialState,
        data: action.data,
        error: null,
        loading: false,
      };
    case SCHEDULE_OF_WEEK_LIST_FAIL:
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