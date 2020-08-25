import { GROUP_SCHEDULE_DELETE_SHIFT_STAGE, GROUP_SCHEDULE_DELETE_SHIFT_STAGE_FAIL, GROUP_SCHEDULE_DELETE_SHIFT_STAGE_SUCCESS } from '../../../constants/actions/calendar/projectCalendar';

export const initialState = {
  data: {
    shifts: null,
    stage_id: null
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case GROUP_SCHEDULE_DELETE_SHIFT_STAGE:
      return {
        ...state,
        error: null,
        loading: action.quite ? false : true,
      };
    case GROUP_SCHEDULE_DELETE_SHIFT_STAGE_SUCCESS:
      return {
        ...state,
        ...initialState,
        data: action.data,
        error: null,
        loading: false,
      };
    case GROUP_SCHEDULE_DELETE_SHIFT_STAGE_FAIL:
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