import * as types from '../../constants/actions/taskDetail/taskDetailConst'

const initialState = {
    activeProjectId: "",
    activeTaskId: "",
    projectGroups: [],
    projectDetail: {},
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case types.CHOOSE_TASK:
            return { ...state, activeTaskId: action.payload }
        case types.CHOOSE_PROJECT:
            return { ...state, activeProjectId: action.payload.id }
        case types.GET_PROJECT_GROUP_LISTPART_SUCCESS:
            return { 
                ...state, 
                projectGroups: action.payload.projectGroups, 
                activeProjectId: action.payload.projectId,
                projectDetail: getFirstProjectDetail(action.payload.projectGroups),
            }
        case types.GET_PROJECT_DETAIL_SUCCESS:
            return { 
                ...state, 
                projectDetail: action.payload.project
            }
        case types.GET_LIST_TASK_DETAIL_SUCCESS:
            return {
                ...state,
                activeTaskId: getFirstTaskId(action.payload)
            }
        default:
            return state
    }
}

const getFirstProjectDetail = projectGroups => {
    let projectDetail
    try {
        projectDetail = projectGroups[0].projects[0] || {}
    } catch {
        projectDetail = {}
    }
    return projectDetail
    
}

const getFirstTaskId = payload => {
    let taskId
    try {
        taskId = payload.tasks[0].tasks[0].id
    } catch {
        taskId = ""
        console.log("ERRROR")
    }
    return taskId
}