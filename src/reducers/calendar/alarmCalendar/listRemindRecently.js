import { LIST_REMIND_RECENTLY, LIST_REMIND_RECENTLY_FAIL, LIST_REMIND_RECENTLY_SUCCESS } from '../../../constants/actions/calendar/alarmCalendar';

export const initialState = {
  data: {
    reminds: [],
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case LIST_REMIND_RECENTLY:
      return {
        ...state,
        error: null,
        loading: action.quite ? false : true,
      };
    case LIST_REMIND_RECENTLY_SUCCESS:
      return {
        ...state,
        ...initialState,
        data: action.data,
        error: null,
        loading: false,
      };
    case LIST_REMIND_RECENTLY_FAIL:
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