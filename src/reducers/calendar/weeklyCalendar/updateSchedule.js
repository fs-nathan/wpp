import { UPDATE_SCHEDULE, UPDATE_SCHEDULE_FAIL, UPDATE_SCHEDULE_SUCCESS } from "../../../constants/actions/calendar/weeklyCalendar";

export const initialState = {
  data: {
    schedule: [],
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SCHEDULE:
      return {
        ...state,
        error: null,
        loading: action.quite ? false : true,
      };
    case UPDATE_SCHEDULE_SUCCESS:
      return {
        ...state,
        ...initialState,
        data: action.data,
        error: null,
        loading: false,
      };
    case UPDATE_SCHEDULE_FAIL:
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