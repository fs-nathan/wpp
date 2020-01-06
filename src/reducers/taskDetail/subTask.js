// Import actions
import * as types from '../../constants/actions/taskDetail/taskDetailConst'
import {
    filterCompleteSubTask,
    filterUncompleteSubTask,
    searchArrayTabpart,
} from '../../helpers/jobDetail/arrayHelper'

// Initial state for store
const initialState = {
    uncompleteSubTasks: [],
    completeSubTasks: [],
    isFetching: false,
    dataFetched: false,
    error: false,
    detailComplete: [],
    detailUnComplete: [],
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
                uncompleteSubTasks: filterUncompleteSubTask(action.payload.sub_tasks),
                completeSubTasks: filterCompleteSubTask(action.payload.sub_tasks),
                detailComplete: filterCompleteSubTask(action.payload.sub_tasks),
                detailUnComplete: filterUncompleteSubTask(action.payload.sub_tasks),
            };
        case types.SEARCH_SUBTASK_TABPART:
            return {
                ...state,
                completeSubTasks:  searchArrayTabpart(state.detailComplete, action.payload, "name"),
                uncompleteSubTasks: searchArrayTabpart(state.detailUnComplete, action.payload, "name"),
            }
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
        case types.UPDATE_SUBTASK_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case types.UPDATE_SUBTASK_SUCCESS:
            return {
                ...state,
                isFetching: false,
                dataFetched: true
            }
        case types.UPDATE_SUBTASK_FAIL:
            return {
                ...state,
                isFetching: false,
                dataFetched: false,
                error: true,
            }
        case types.DELETE_SUBTASK_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case types.DELETE_SUBTASK_SUCCESS:
            return {
                ...state,
                isFetching: false,
                dataFetched: true
            }
        case types.DELETE_SUBTASK_FAIL:
            return {
                ...state,
                isFetching: false,
                dataFetched: false,
                error: true,
            }
        case types.POST_COMPLETE_SUBTASK_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case types.POST_COMPLETE_SUBTASK_SUCCESS:
            return {
                ...state,
                isFetching: false,
                dataFetched: true
            }
        case types.POST_COMPLETE_SUBTASK_FAIL:
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