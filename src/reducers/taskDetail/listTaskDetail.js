// Import actions
import { findTask } from 'helpers/jobDetail/arrayHelper';
import sortBy from 'lodash/sortBy';
import * as types from '../../constants/actions/taskDetail/taskDetailConst';

function getNewChat(newChat, current) {
    if (newChat === 0) return 0
    if (newChat === 1) return current + 1
    return undefined
}


function changeGroupTaskDetail(listTaskDetail, task_id, group_task) {
    const repTask = findTask(listTaskDetail, task_id)
    return listTaskDetail.map((group) => {
        const { tasks, id } = group;
        if (id === group_task) {
            return {
                ...group,
                tasks: [...tasks, repTask]
            };
        }
        return {
            ...group,
            tasks: tasks.filter((task) => task_id !== task.id)
        };
    })
}

function updateListTaskDetail(listTaskDetail, task_id, update) {
    return listTaskDetail.map((data) => {
        const { tasks } = data;
        const updatedTasks = tasks.map((task) => {
            if (task_id === task.id) {
                const { new_chat } = update;
                return {
                    ...task,
                    ...update,
                    new_chat: getNewChat(new_chat, task.new_chat)
                }
            }
            return task;
        })
        // const sortedTasks = sortBy(updatedTasks, [function (o) { return -o.is_ghim; }, 'updatedAt'])
        return {
            ...data,
            tasks: updatedTasks
        };
    })
}

function updateListDataNotRoom(listDataNotRoom, task_id, update) {
    const updatedTasks = listDataNotRoom.map((data) => {
        if (task_id === data.id) {
            const { new_chat } = update;
            return {
                ...data,
                ...update,
                new_chat: getNewChat(new_chat, data.new_chat)
            }
        }
        return data;
    })
    const sortedTasks = sortBy(updatedTasks, [function (o) { return -o.is_ghim; }, function (o) { return -o.updatedAt; }])
    return sortedTasks
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
        case types.UPDATE_PROJECT_CHAT:
            const { payload } = action;
            const { id, task_id, content, new_chat,
                user_create_avatar, user_create_id,
                updatedAt,
                complete,
                user_create_name } = payload;
            const chat = content ? {
                content, user_create_avatar, user_create_name
            } : undefined;
            const update = {
                new_chat,
                updatedAt,
                complete,
                chat
            }
            return {
                ...state,
                listTaskDetail: updateListTaskDetail(state.listTaskDetail, task_id, update),
                listDataNotRoom: updateListDataNotRoom(state.listDataNotRoom, task_id, update),
            }
        case types.GET_TASK_DETAIL_TABPART_REQUEST:
            const { options } = action;
            return {
                ...state,
                listTaskDetail: updateListTaskDetail(state.listTaskDetail, options.taskId, { new_chat: 0 }),
                listDataNotRoom: updateListDataNotRoom(state.listDataNotRoom, options.taskId, { new_chat: 0 }),
            }
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
            const { payload, task_id } = action;
            return {
                ...state,
                listTaskDetail: updateListTaskDetail(state.listTaskDetail, task_id, { status_code: 4 }),
                listDataNotRoom: updateListDataNotRoom(state.listDataNotRoom, task_id, { status_code: 4 }),
            }
        }
        case types.CANCEL_STOP_TASK_SUCCESS: {
            const { payload, task_id } = action;
            return {
                ...state,
                listTaskDetail: updateListTaskDetail(state.listTaskDetail, task_id, { status_code: 1 }),
                listDataNotRoom: updateListDataNotRoom(state.listDataNotRoom, task_id, { status_code: 1 }),
            }
        }
        case types.UPDATE_GROUP_TASK_SUCCESS: {
            const { task_id, group_task } = action.payload;
            return {
                ...state,
                listTaskDetail: changeGroupTaskDetail(state.listTaskDetail, task_id, group_task),
            }
        }
        default:
            return state;
    }
}