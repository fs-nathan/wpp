// Import actions
import * as types from '../../constants/actions/taskDetail/taskDetailConst';

function updateListTaskDetail(listTaskDetail, id, update) {
    return listTaskDetail.map((data) => {
        const { tasks } = data;
        return {
            ...data,
            tasks: tasks.map((task) => {
                if (id === task.id) {
                    return { ...task, ...update }
                }
                return task;
            })
        };
    })
}

function updateListDataNotRoom(listDataNotRoom, id, update) {
    return listDataNotRoom.map((data) => {
        if (id === data.id) {
            return { ...data, ...update }
        }
        return data;
    })
}

// Initial state for store
const initialState = {
    listTaskDetail: [],
    isFetching: false,
    dataFetched: false,
    error: false,
    defaultListTaskDetail: [],
    staticTask: [],
    listTaskDataType: '',
    listDataNotRoom: [],
    filterTaskType: 0,
    searchKey: '',
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
                searchKey: action.payload,
                // listTaskDetail: { tasks: searchTaskByTaskName(state.defaultListTaskDetail, action.payload) }
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
                listTaskDetail: updateListTaskDetail(state.listTaskDetail, id, { name: payload.data_chat.new_task_name }),
                listDataNotRoom: updateListDataNotRoom(state.listDataNotRoom, id, { name: payload.data_chat.new_task_name }),
            }
        }
        case types.STOP_TASK_SUCCESS: {
            const { payload, id } = action;
            return {
                ...state,
                listTaskDetail: updateListTaskDetail(state.listTaskDetail, id, { state_code: 4 }),
                listDataNotRoom: updateListDataNotRoom(state.listDataNotRoom, id, { state_code: 4 }),
            }
        }
        case types.CANCEL_STOP_TASK_SUCCESS: {
            const { payload, id } = action;
            return {
                ...state,
                listTaskDetail: updateListTaskDetail(state.listTaskDetail, id, { state_code: 0 }),
                listDataNotRoom: updateListDataNotRoom(state.listDataNotRoom, id, { state_code: 0 }),
            }
        }
        default:
            return state;
    }
}