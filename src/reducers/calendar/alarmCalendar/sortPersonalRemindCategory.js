import { SORT_PERSONAL_REMIND_CATEGORY, SORT_PERSONAL_REMIND_CATEGORY_FAIL, SORT_PERSONAL_REMIND_CATEGORY_SUCCESS } from "../../../constants/actions/calendar/alarmCalendar";

export const initialState = {
  data: {
    categories: [],
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SORT_PERSONAL_REMIND_CATEGORY:
      return {
        ...state,
        error: null,
        loading: action.quite ? false : true,
      };
    case SORT_PERSONAL_REMIND_CATEGORY_SUCCESS:
      return {
        ...state,
        ...initialState,
        data: action.data,
        error: null,
        loading: false,
      };
    case SORT_PERSONAL_REMIND_CATEGORY_FAIL:
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