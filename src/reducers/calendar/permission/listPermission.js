import { CALENDAR_PAGE_PERMISSION, CALENDAR_PAGE_PERMISSION_FAIL, CALENDAR_PAGE_PERMISSION_SUCCESS } from "../../../constants/actions/calendar/permission";

export const initialState = {
  data: {
    permissions: [],
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case CALENDAR_PAGE_PERMISSION:
      return {
        ...state,
        error: null,
        loading: action.quite ? false : true,
      };
    case CALENDAR_PAGE_PERMISSION_SUCCESS:
      return {
        ...state,
        ...initialState,
        data: action.data,
        error: null,
        loading: false,
      };
    case CALENDAR_PAGE_PERMISSION_FAIL:
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