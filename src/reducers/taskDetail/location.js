// Import actions
import * as types from '../../constants/actions/taskDetail/taskDetailConst'
import { searchAttributesArray } from '../../helpers/jobDetail/arrayHelper'
// Initial state for store
const initialState = {
    locations: [],
    isFetching: false,
    dataFetched: false,
    error: false,
    detailLocation: [],
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case types.GET_LOCATION_TABPART_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case types.GET_LOCATION_TABPART_SUCCESS:
            return {
                ...state,
                isFetching: false,
                dataFetched: true,
                locations: action.payload,
                detailLocation: action.payload.locations,
            };
        case types.GET_LOCATION_TABPART_FAIL:
            return {
                ...state,
                isFetching: false,
                dataFetched: false,
                error: true,
            }
        case types.SEARCH_LOCATION_TABPART:
            return {
                ...state,
                locations: {locations: searchAttributesArray(state.detailLocation, action.payload, "user_share", "locations")},
            }
        default:
            return state;
    }
}