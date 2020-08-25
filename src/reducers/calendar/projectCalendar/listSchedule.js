import { GROUP_SCHEDULE_LIST, GROUP_SCHEDULE_LIST_FAIL, GROUP_SCHEDULE_LIST_SUCCESS } from "../../../constants/actions/calendar/projectCalendar";

export const initialState = {
  data: {
    schedules: [],
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case GROUP_SCHEDULE_LIST:
      return {
        ...state,
        error: null,
        loading: action.quite ? false : true,
      };
    case GROUP_SCHEDULE_LIST_SUCCESS:
      return {
        ...state,
        ...initialState,
        data: action.data,
        error: null,
        loading: false,
      };
    case GROUP_SCHEDULE_LIST_FAIL:
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