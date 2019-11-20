// Import actions
import * as types from '../../constants/actions/taskDetail/taskDetailConst'

// Initial state for store
const initialState = {
    command: [],
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
                command: action.payload.commands
            };
        case types.GET_COMMAND_FAIL:
            return {
                ...state,
                isFetching: false,
                dataFetched: false,
                error: true,
            }
        // case types.CREATE_OFFER_REQUEST:
        //     return {
        //         ...state,
        //         isFetching: true
        //     }
        // case types.CREATE_OFFER_SUCCESS:
        //     return {
        //         ...state,
        //         isFetching: false,
        //         dataFetched: true,
        //     };

        // case types.CREATE_OFFER_FAIL:
        //     return {
        //         ...state,
        //         isFetching: false,
        //         dataFetched: false,
        //         error: true,
        //     }

        default:
            return state;
    }
}