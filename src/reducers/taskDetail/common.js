import * as types from '../../constants/actions/taskDetail/taskDetailConst'
import { searchProjectByProjectName } from '../../helpers/jobDetail/arrayHelper'
const initialState = {
    activeProjectId: "",
    activeTaskId: "",
    projectGroups: [],
    projectDetail: {},
    projectListBasic: null,
    defaultProjectBasic: [],
}

export default function reducer(state = initialState, action) {
    // console.log("reducer text search:::", action.payload);
    switch (action.type) {
        case types.CHOOSE_TASK:
            return { ...state, activeTaskId: action.payload }
        case types.CHOOSE_PROJECT:
            return { ...state, activeProjectId: action.payload.id }
        // case types.GET_PROJECT_GROUP_LISTPART_SUCCESS:
        //     return { 
        //         ...state, 
        //         projectGroups: action.payload.projectGroups, 
        //         activeProjectId: action.payload.projectId,
        //         projectDetail: getFirstProjectDetail(action.payload.projectGroups),
        //     }
        case types.GET_PROJECT_DETAIL_SUCCESS:
            return { 
                ...state, 
                projectDetail: action.payload.project
            }
        case types.GET_PROJECT_LIST_BASIC_SUCCESS:
            return {
                ...state,
                projectListBasic: action.payload,
                activeProjectId: action.payload.projectId,
                projectDetail: getFirstProjectDetail(action.payload.projectGroups),
                defaultProjectBasic: action.payload.projectGroups,
            }
        case types.GET_LIST_TASK_DETAIL_SUCCESS:
            return {
                ...state,
                activeTaskId: getFirstTaskId(action.payload)
            }
        case types.SEARCH_PROJECT:
            return {
                ...state,
                projectListBasic: {projectGroups: searchProjectByProjectName(state.defaultProjectBasic, action.payload)}
            }
        default:
            return state
    }
}

const getFirstProjectDetail = projectGroups => {
    let projectDetail
    try {
        projectDetail = projectGroups.find(project => project.projects.length).projects[0] || {}
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
    }
    return taskId
}