// Import actions
import {
    GET_SUBTASK_FAIL,
    GET_SUBTASK_REQUEST,
    GET_SUBTASK_SUCCESS
} from '../../constants/actions/taskDetail/taskDetailConst'

// Initial state for store
const initialState = {
    offer: [],
    isFetching: false,
    dataFetched: false,
    error: false,
};
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_SUBTASK_SUCCESS:
            return {
                ...state,
                isFetching: false,
                dataFetched: true,
                offer: action.payload
            };
        case GET_SUBTASK_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case GET_SUBTASK_FAIL:
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