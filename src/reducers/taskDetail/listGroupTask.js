// Import actions
import * as types from '../../constants/actions/taskDetail/taskDetailConst'

// Initial state for store
const initialState = {
    listGroupTask: null,
    isFetching: false,
    dataFetched: false,
    error: false,
};

export default function reducer(state = initialState, action) {
    
    switch (action.type) {
        case types.GET_LIST_GROUP_TASK_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case types.GET_LIST_GROUP_TASK_SUCCESS:
            return {
                ...state,
                isFetching: false,
                dataFetched: true,
                listGroupTask: action.payload
            };
        case types.GET_LIST_GROUP_TASK_FAIL:
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