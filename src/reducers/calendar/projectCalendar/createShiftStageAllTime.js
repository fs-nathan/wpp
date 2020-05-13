import { GROUP_SCHEDULE_CREATE_SHIFT_STAGE_ALLTIME, GROUP_SCHEDULE_CREATE_SHIFT_STAGE_ALLTIME_FAIL, GROUP_SCHEDULE_CREATE_SHIFT_STAGE_ALLTIME_SUCCESS } from '../../../constants/actions/calendar/projectCalendar';

export const initialState = {
  data: {
    shifts: null
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case GROUP_SCHEDULE_CREATE_SHIFT_STAGE_ALLTIME:
      return {
        ...state,
        error: null,
        loading: action.quite ? false : true,
      };
    case GROUP_SCHEDULE_CREATE_SHIFT_STAGE_ALLTIME_SUCCESS:
      return {
        ...state,
        ...initialState,
        data: action.data,
        error: null,
        loading: false,
      };
    case GROUP_SCHEDULE_CREATE_SHIFT_STAGE_ALLTIME_FAIL:
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