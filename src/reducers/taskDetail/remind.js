// Import actions
import * as types from '../../constants/actions/taskDetail/taskDetailConst'

// Initial state for store
const initialState = {
    remind: [],
    isFetching: false,
    dataFetched: false,
    error: false,
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
                remind: action.payload.reminds
            };
        case types.GET_REMIND_FAIL:
            return {
                ...state,
                isFetching: false,
                dataFetched: false,
                error: true,
            }
        case types.POST_REMIND_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case types.POST_REMIND_SUCCESS:
            return {
                ...state,
                isFetching: false,
                dataFetched: true,
            };

        case types.POST_REMIND_FAIL:
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