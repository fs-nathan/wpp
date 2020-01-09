// Import actions
import * as types from '../../constants/actions/taskDetail/taskDetailConst'
import { 
    filterCommandItem, 
    filterDecisionItem, 
    searchArrayTabpart
} from '../../helpers/jobDetail/arrayHelper'

// Initial state for store
const initialState = {
    command: [], commandItems: [], decisionItems: [],
    defaultCommand: [], defaultCommandItems: [], defaultDecisionItems: [],
    isFetching: false,
    dataFetched: false,
    error: false,

};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case types.GET_COMMAND_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case types.GET_COMMAND_SUCCESS:
            return {
                ...state,
                isFetching: false,
                dataFetched: true,
                command: action.payload.commands.reverse(),
                decisionItems: filterDecisionItem(action.payload.commands.reverse()),
                commandItems: filterCommandItem(action.payload.commands.reverse()),
                defaultCommand: action.payload.commands.reverse(),
                defaultCommandItems: filterCommandItem(action.payload.commands.reverse()),
                defaultDecisionItems: filterDecisionItem(action.payload.commands.reverse()),
            };
        case types.GET_COMMAND_FAIL:
            return {
                ...state,
                isFetching: false,
                dataFetched: false,
                error: true,
            }
        case types.CREATE_COMMAND_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case types.CREATE_COMMAND_SUCCESS:
            return {
                ...state,
                isFetching: false,
                dataFetched: true,
            };

        case types.CREATE_COMMAND_FAIL:
            return {
                ...state,
                isFetching: false,
                dataFetched: false,
                error: true,
            }
        case types.UPDATE_COMMAND_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case types.UPDATE_COMMAND_SUCCESS:
            return {
                ...state,
                isFetching: false,
                dataFetched: true
            }
        case types.UPDATE_COMMAND_FAIL:
            return {
                ...state,
                isFetching: false,
                dataFetched: false,
                error: true,
            }
        case types.DELETE_COMMAND_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case types.DELETE_COMMAND_SUCCESS:
            return {
                ...state,
                isFetching: false,
                dataFetched: true
            }
        case types.DELETE_COMMAND_FAIL:
            return {
                ...state,
                isFetching: false,
                dataFetched: false,
                error: true,
            }
        case types.SEARCH_DEMAND_TABPART:
            return {
                ...state,
                command: searchArrayTabpart(state.defaultCommand, action.payload, 'content'),
                decisionItems: searchArrayTabpart(state.defaultDecisionItems, action.payload, 'content'),
                commandItems: searchArrayTabpart(state.defaultCommandItems, action.payload, 'content'),
            }
        default:
            return state;
    }
}