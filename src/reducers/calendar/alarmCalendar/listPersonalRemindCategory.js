import { LIST_PERSONAL_REMIND_CATEGORY, LIST_PERSONAL_REMIND_CATEGORY_FAIL, LIST_PERSONAL_REMIND_CATEGORY_SUCCESS } from "../../../constants/actions/calendar/alarmCalendar";

export const initialState = {
  data: {
    categories: [],
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case LIST_PERSONAL_REMIND_CATEGORY:
      return {
        ...state,
        error: null,
        loading: action.quite ? false : true,
      };
    case LIST_PERSONAL_REMIND_CATEGORY_SUCCESS:
      return {
        ...state,
        ...initialState,
        data: action.data,
        error: null,
        loading: false,
      };
    case LIST_PERSONAL_REMIND_CATEGORY_FAIL:
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