// Import actions
import * as types from '../../constants/actions/taskDetail/taskDetailConst'

// Initial state for store
const initialState = {
    taskDetails: null,
    isFetching: false,
    dataFetched: false,
    error: false,
};


export default function reducer(state = initialState, action) {

    switch (action.type) {
        case types.GET_TASK_DETAIL_TABPART_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case types.GET_TASK_DETAIL_TABPART_SUCCESS:
            return {
                ...state,
                isFetching: false,
                dataFetched: true,
                taskDetails: action.payload.task
            };
        case types.GET_TASK_DETAIL_TABPART_FAIL:
            return {
                ...state,
                isFetching: false,
                dataFetched: false,
                error: true,
            }
        case types.UPDATE_TASK_PRIORITY_REQUEST:
            return {
                ...state,
                isFetching: true,
            }
        case types.UPDATE_TASK_PRIORITY_SUCCESS:
            return {
                ...state,
                isFetching: false,
                dataFetched: true
            }
        case types.UPDATE_TASK_PRIORITY_FAIL:
            return {
                ...state,
                isFetching: false,
                dataFetched: false,
                error: true
            }
        default:
            return state;
    }
}