// Import actions
import { lastJobSettingKey } from 'views/JobDetailPage/ListPart/ListHeader/CreateJobSetting';
import * as types from '../../constants/actions/taskDetail/taskDetailConst';
import { filterTaskByType, searchTaskByTaskName } from '../../helpers/jobDetail/arrayHelper';

// Initial state for store
const initialState = {
    listTaskDetail: null,
    isFetching: false,
    dataFetched: false,
    error: false,
    defaultListTaskDetail: [],
    staticTask: [],
    listTaskDataType: localStorage.getItem(lastJobSettingKey) || 'include-room',
    listDataNotRoom: null,
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
            const newData = {
                ...state,
                isFetching: false,
                dataFetched: true,
                listTaskDataType: action.type_data,
                listTaskDetail: action.payload,
            };
            if (action.type_data === 'include-room') {
                newData.listTaskDetail = action.payload
                newData.defaultListTaskDetail = action.payload.tasks
            } else {
                newData.listDataNotRoom = action.payload
            }
            return newData;
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
        case types.STATIC_TASK_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case types.STATIC_TASK_SUCCESS:
            return {
                ...state,
                isFetching: false,
                dataFetched: true,
                error: false,
                staticTask: action.payload,
            }
        case types.STATIC_TASK_FAIL:
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