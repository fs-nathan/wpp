import * as types from '../../constants/actions/taskDetail/taskDetailConst'
import { 
    searchProjectByProjectName,
    getFirstProjectDetail,
    getFirstTaskId 
} from '../../helpers/jobDetail/arrayHelper'
const initialState = {
    activeProjectId: "",
    activeTaskId: "",
    projectGroups: [],
    projectDetail: {},
    projectListBasic: null,
    defaultProjectBasic: [],
    updateComplete: ''
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
        case types.UPDATE_COMPLETE_SUCCESS: {
            return {
                ...state,
                updateComplete: action.payload
            }
        }
        default:
            return state
    }
}

