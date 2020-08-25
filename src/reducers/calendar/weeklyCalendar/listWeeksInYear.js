import { LIST_WEEKS_IN_YEAR, LIST_WEEKS_IN_YEAR_FAIL, LIST_WEEKS_IN_YEAR_SUCCESS } from "../../../constants/actions/calendar/weeklyCalendar";

export const initialState = {
  data: {
    weeks: [],
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case LIST_WEEKS_IN_YEAR:
      return {
        ...state,
        error: null,
        loading: action.quite ? false : true,
      };
    case LIST_WEEKS_IN_YEAR_SUCCESS:
      return {
        ...state,
        ...initialState,
        data: action.data,
        error: null,
        loading: false,
      };
    case LIST_WEEKS_IN_YEAR_FAIL:
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