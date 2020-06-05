// Import actions
import * as types from '../../constants/actions/taskDetail/taskDetailConst'
import { searchArrayTabpart } from '../../helpers/jobDetail/arrayHelper'
// Initial state for store
const initialState = {
    remind: [],
    isFetching: false,
    dataFetched: false,
    error: false,
    detailRemind: [],
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case types.GET_REMIND_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case types.GET_REMIND_SUCCESS:
            return {
                ...state,
                isFetching: false,
                dataFetched: true,
                remind: action.payload.reminds.reverse(),
                detailRemind: action.payload.reminds.reverse()
            };
        case types.SEARCH_REMIND_TABPART:
            return {
                ...state,
                remind: searchArrayTabpart(state.detailRemind, action.payload, "content"),
            }
        case types.GET_REMIND_FAIL:
            return {
                ...state,
                isFetching: false,
                dataFetched: false,
                error: true,
            }
        case types.POST_REMIND_TIME_DETAIL_REQUEST:
            return {
                ...state,
                isFetching: true
            }

        case types.POST_REMIND_TIME_DETAIL_SUCCESS:
            return {
                ...state,
                isFetching: false,
                dataFetched: true,
                error: false,
            };

        case types.POST_REMIND_TIME_DETAIL_FAIL:
            return {
                ...state,
                isFetching: false,
                dataFetched: false,
                error: true,
            }
        case types.POST_REMIND_DURATION_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case types.POST_REMIND_DURATION_SUCCESS:
            return {
                ...state,
                isFetching: false,
                dataFetched: true,
                error: false,
            };

        case types.POST_REMIND_DURATION_FAIL:
            return {
                ...state,
                isFetching: false,
                dataFetched: false,
                error: true,
            }
        case types.UPDATE_REMIND_TIME_DETAIL_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case types.UPDATE_REMIND_TIME_DETAIL_SUCCESS:
            return {
                ...state,
                isFetching: false,
                dataFetched: true,
                error: false,
            };

        case types.UPDATE_REMIND_TIME_DETAIL_FAIL:
            return {
                ...state,
                isFetching: false,
                dataFetched: false,
                error: true,
            }
        case types.UPDATE_REMIND_DURATION_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case types.UPDATE_REMIND_DURATION_SUCCESS:
            return {
                ...state,
                isFetching: false,
                dataFetched: true,
                error: false,
            };

        case types.UPDATE_REMIND_DURATION_FAIL:
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