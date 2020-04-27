import { SETTING_STARTING_DAY, SETTING_STARTING_DAY_FAIL, SETTING_STARTING_DAY_SUCCESS } from "../../../constants/actions/calendar/weeklyCalendar";

export const initialState = {
  data: {
    state: null,
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SETTING_STARTING_DAY:
      return {
        ...state,
        error: null,
        loading: action.quite ? false : true,
      };
    case SETTING_STARTING_DAY_SUCCESS:
      return {
        ...state,
        ...initialState,
        data: action.data,
        error: null,
        loading: false,
      };
    case SETTING_STARTING_DAY_FAIL:
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