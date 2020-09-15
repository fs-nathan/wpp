import {
  GET_REMIND_DETAIL,
  GET_REMIND_DETAIL_FAIL,
  GET_REMIND_DETAIL_SUCCESS
} from "../../../constants/actions/calendar/alarmCalendar";

export const initialState = {
  remind: null,
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_REMIND_DETAIL:
      return {
        ...state,
        error: null,
        loading: action.quite ? false : true,
      };
    case GET_REMIND_DETAIL_SUCCESS:
      return {
        ...state,
        ...initialState,
        remind: action.data.remind,
        error: null,
        loading: false,
      };
    case GET_REMIND_DETAIL_FAIL:
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