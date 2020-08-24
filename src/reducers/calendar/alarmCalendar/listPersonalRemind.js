import {
  CREATE_PERSONAL_CATEGORY_REMIND_SUCCESS,
  LIST_PERSONAL_REMIND,
  LIST_PERSONAL_REMIND_FAIL,
  LIST_PERSONAL_REMIND_SUCCESS
} from "../../../constants/actions/calendar/alarmCalendar";

export const initialState = {
  data: {
    reminds: [],
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case LIST_PERSONAL_REMIND:
      return {
        ...state,
        error: null,
        loading: action.quite ? false : true,
      };
    case LIST_PERSONAL_REMIND_SUCCESS:
      return {
        ...state,
        ...initialState,
        data: action.data,
        error: null,
        loading: false,
      };
    case LIST_PERSONAL_REMIND_FAIL:
      return {
        ...state,
        ...initialState,
        error: action.error,
        loading: false,
      };
    case CREATE_PERSONAL_CATEGORY_REMIND_SUCCESS:
      return {
        ...state,
        ...initialState,
        data: {
          reminds: state.data.reminds.concat(action.data.category)
        },
        error: null,
        loading: false,
      };
    default:
      return state;
  }
}

export default reducer;