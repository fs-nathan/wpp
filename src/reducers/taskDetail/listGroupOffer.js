// Import actions
import * as types from '../../constants/actions/taskDetail/taskDetailConst'

// Initial state for store
const initialState = {
  offers: [],
  isFetching: false,
  dataFetched: false,
  error: false,
};

export default function reducer(state = initialState, action) {

  switch (action.type) {
    case types.GET_LIST_OFFER_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case types.GET_LIST_OFFER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        dataFetched: true,
        offers: action.payload.offers_group
      };
    case types.GET_LIST_OFFER_FAIL:
      return {
        ...state,
        isFetching: false,
        dataFetched: false,
        error: true,
      }
    default:
      return state;
  }
}