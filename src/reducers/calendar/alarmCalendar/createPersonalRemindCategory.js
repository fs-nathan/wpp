import { CREATE_PERSONAL_CATEGORY_REMIND, CREATE_PERSONAL_CATEGORY_REMIND_FAIL, CREATE_PERSONAL_CATEGORY_REMIND_SUCCESS } from "../../../constants/actions/calendar/alarmCalendar";

export const initialState = {
  data: {
    category: null,
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_PERSONAL_CATEGORY_REMIND:
      return {
        ...state,
        error: null,
        loading: action.quite ? false : true,
      };
    case CREATE_PERSONAL_CATEGORY_REMIND_SUCCESS:
      return {
        ...state,
        ...initialState,
        data: action.data,
        error: null,
        loading: false,
      };
    case CREATE_PERSONAL_CATEGORY_REMIND_FAIL:
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