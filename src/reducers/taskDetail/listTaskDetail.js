// Import actions
import * as types from '../../constants/actions/taskDetail/taskDetailConst'
import { filterTaskByType, searchTaskByTaskName } from '../../helpers/jobDetail/arrayHelper';

// Initial state for store
const initialState = {
    listTaskDetail: null,
    isFetching: false,
    dataFetched: false,
    error: false,
    defaultListTaskDetail: [],
};

export default function reducer(state = initialState, action) {
    // console.log("reducer text search:::", action.payload);
    
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
                listTaskDetail: action.payload,
                defaultListTaskDetail: action.payload.tasks
            };
        case types.FILTER_TASK_BY_TYPE:
            return {
                ...state,
                listTaskDetail: { tasks: filterTaskByType(state.defaultListTaskDetail, action.payload) }
            }
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
        case types.SEARCH_TASK:
            return {
                ...state,
                listTaskDetail: { tasks: searchTaskByTaskName(state.defaultListTaskDetail, action.payload) }
            }
        default:
            return state;
    }
}