import { SETTING_START_DAY_WEEK, SETTING_START_DAY_WEEK_FAIL, SETTING_START_DAY_WEEK_SUCCESS } from "../../../constants/actions/calendar/projectCalendar";

export const initialState = {
  data: {
    state: null,
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SETTING_START_DAY_WEEK:
      return {
        ...state,
        error: null,
        loading: action.quite ? false : true,
      };
    case SETTING_START_DAY_WEEK_FAIL:
      return {
        ...state,
        ...initialState,
        data: action.data,
        error: null,
        loading: false,
      };
    case SETTING_START_DAY_WEEK_SUCCESS:
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