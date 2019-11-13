// Import actions
import * as types from '../../constants/actions/taskDetail/taskDetailConst'

// Initial state for store
const initialState = {
    subTasks: [],
    isFetching: false,
    dataFetched: false,
    error: false,
};
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case types.GET_SUBTASK_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case types.GET_SUBTASK_SUCCESS:
            return {
                ...state,
                isFetching: false,
                dataFetched: true,
                subTasks: action.payload.sub_tasks
            };
        case types.GET_SUBTASK_FAIL:
            return {
                ...state,
                isFetching: false,
                dataFetched: false,
                error: true,
            }
        case types.POST_SUBTASK_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case types.POST_SUBTASK_SUCCESS:
            return {
                ...state,
                isFetching: false,
                dataFetched: true
            }
        case types.POST_SUBTASK_FAIL:
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