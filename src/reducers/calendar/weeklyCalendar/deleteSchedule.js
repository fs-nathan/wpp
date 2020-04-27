import { DELETE_SCHEDULE, DELETE_SCHEDULE_FAIL, DELETE_SCHEDULE_SUCCESS } from "../../../constants/actions/calendar/weeklyCalendar";

export const initialState = {
  data: {
    id: null,
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case DELETE_SCHEDULE:
      return {
        ...state,
        error: null,
        loading: action.quite ? false : true,
      };
    case DELETE_SCHEDULE_SUCCESS:
      return {
        ...state,
        ...initialState,
        data: action.data,
        error: null,
        loading: false,
      };
    case DELETE_SCHEDULE_FAIL:
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