// Import actions
import { lastJobSettingKey } from 'views/JobDetailPage/ListPart/ListHeader/CreateJobSetting';
import * as types from '../../constants/actions/taskDetail/taskDetailConst';
import { searchTaskByTaskName } from '../../helpers/jobDetail/arrayHelper';

// Initial state for store
const initialState = {
    listTaskDetail: [],
    isFetching: false,
    dataFetched: false,
    error: false,
    defaultListTaskDetail: [],
    staticTask: [],
    listTaskDataType: localStorage.getItem(lastJobSettingKey) || 'include-room',
    listDataNotRoom: [],
    filterTaskType: 0,
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
            };
            if (action.type_data) {
                if (action.type_data === 'include-room') {
                    newData.listTaskDetail = action.payload.tasks
                    newData.defaultListTaskDetail = action.payload.tasks
                } else {
                    newData.listDataNotRoom = action.payload.tasks
                }
            }
            return newData;
        case types.FILTER_TASK_BY_TYPE:
            return {
                ...state,
                filterTaskType: action.payload,
                // listTaskDetail: { tasks: filterTaskByType(state.defaultListTaskDetail, action.payload) }
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
        case types.UPDATE_NAME_DESCRIPTION_SUCCESS: {
            const { payload, id } = action;
            return {
                ...state,
                listTaskDetail: state.listTaskDetail.map((data) => {
                    const { id } = data;
                    if (action.id === id) {
                        return { ...data, name: payload.data_chat.new_task_name }
                    }
                    return data;
                }),
                listDataNotRoom: state.listDataNotRoom.map((data) => {
                    const { id } = data;
                    if (action.id === id) {
                        return { ...data, name: payload.data_chat.new_task_name }
                    }
                    return data;
                })
            }
        }
        default:
            return state;
    }
}