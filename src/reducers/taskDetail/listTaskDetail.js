// Import actions
import * as types from '../../constants/actions/taskDetail/taskDetailConst'

// Initial state for store
const initialState = {
    listTaskDetail: null,
    isFetching: false,
    dataFetched: false,
    error: false,
};

export default function reducer(state = initialState, action) {

    switch (action.type) {
        case types.GET_LIST_TASK_DETAIL_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case types.GET_LIST_TASK_DETAIL_SUCCESS:
            return {
                ...state,
                isFetching: false,
                dataFetched: true,
                listTaskDetail: action.payload
            };
        case types.GET_LIST_TASK_DETAIL_FAIL:
            return {
                ...state,
                isFetching: false,
                dataFetched: false,
                error: true,
            }
        case types.POST_TASK_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case types.POST_TASK_SUCCESS:
            return {
                ...state,
                isFetching: false,
                dataFetched: true,
            };
        case types.POST_TASK_FAIL:
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