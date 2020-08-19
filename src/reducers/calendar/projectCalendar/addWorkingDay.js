import { GROUP_SCHEDULE_ADD_WORKING_DAY, GROUP_SCHEDULE_ADD_WORKING_DAY_FAIL, GROUP_SCHEDULE_ADD_WORKING_DAY_SUCCESS } from '../../../constants/actions/calendar/projectCalendar';

export const initialState = {
  data: {
    workDays: null,
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case GROUP_SCHEDULE_ADD_WORKING_DAY:
      return {
        ...state,
        error: null,
        data: null,
        loading: action.quite ? false : true,
      };
    case GROUP_SCHEDULE_ADD_WORKING_DAY_SUCCESS:
      return {
        ...state,
        ...initialState,
        data: action.data,
        error: null,
        loading: false,
      };
    case GROUP_SCHEDULE_ADD_WORKING_DAY_FAIL:
      return {
        ...state,
        ...initialState,
        error: action.error,
        data: null,
        loading: false,
      };
    default:
      return state;
  }
}

export default reducer;