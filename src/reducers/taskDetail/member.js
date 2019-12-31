// Import actions
import * as types from '../../constants/actions/taskDetail/taskDetailConst'
import { searchArrayTabpart } from '../../helpers/jobDetail/arrayHelper'

// Initial state for store
const initialState = {
    member: [],
    defaultMember: [],
    memberNotAssigned: [],
    user_roles: [],
    isFetching: false,
    dataFetched: false,
    error: false,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case types.GET_MEMBER_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case types.GET_MEMBER_SUCCESS:
            return {
                ...state,
                isFetching: false,
                dataFetched: true,
                member: action.payload.members,
                defaultMember: action.payload.members,
            };
        case types.GET_MEMBER_FAIL:
            return {
                ...state,
                isFetching: false,
                dataFetched: false,
                error: true,
            }
        case types.GET_MEMBER_NOT_ASSIGNED_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case types.GET_MEMBER_NOT_ASSIGNED_SUCCESS:
            return {
                ...state,
                isFetching: false,
                dataFetched: true,
                memberNotAssigned: action.payload.members,
            };
        case types.GET_MEMBER_NOT_ASSIGNED_FAIL:
            return {
                ...state,
                isFetching: false,
                dataFetched: false,
                error: true,
            }
        case types.POST_MEMBER_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case types.POST_MEMBER_SUCCESS:
            return {
                ...state,
                isFetching: false,
                dataFetched: true,
            };
        case types.POST_MEMBER_FAIL:
            return {
                ...state,
                isFetching: false,
                dataFetched: false,
                error: true,
            }
        case types.DELETE_MEMBER_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case types.DELETE_MEMBER_SUCCESS:
            return {
                ...state,
                isFetching: false,
                dataFetched: true
            }
        case types.DELETE_MEMBER_FAIL:
            return {
                ...state,
                isFetching: false,
                dataFetched: false,
                error: true,
            }
        //Member role
        case types.GET_ROLE_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case types.GET_ROLE_SUCCESS:
            return {
                ...state,
                isFetching: false,
                dataFetched: true,
                user_roles: action.payload.user_roles,
            };
        case types.GET_ROLE_FAIL:
            return {
                ...state,
                isFetching: false,
                dataFetched: false,
                error: true,
            }
        case types.POST_ROLE_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case types.POST_ROLE_SUCCESS:
            return {
                ...state,
                isFetching: false,
                dataFetched: true,
            };
        case types.POST_ROLE_FAIL:
            return {
                ...state,
                isFetching: false,
                dataFetched: false,
                error: true,
            }
        case types.UPDATE_ROLE_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case types.UPDATE_ROLE_SUCCESS:
            return {
                ...state,
                isFetching: false,
                dataFetched: true,
            };
        case types.UPDATE_ROLE_FAIL:
            return {
                ...state,
                isFetching: false,
                dataFetched: false,
                error: true,
            }
        case types.DELETE_ROLE_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case types.DELETE_ROLE_SUCCESS:
            return {
                ...state,
                isFetching: false,
                dataFetched: true,
            };
        case types.DELETE_ROLE_FAIL:
            return {
                ...state,
                isFetching: false,
                dataFetched: false,
                error: true,
            }
        case types.SEARCH_MEMBER_TABPART:
            return {
                ...state,
                member: searchArrayTabpart(state.defaultMember, action.payload, "name")
            }
        default:
            return state;
    }
}