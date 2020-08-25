// Import actions
import * as types from '../../constants/actions/taskDetail/taskDetailConst'
import { searchAttributesArray } from '../../helpers/jobDetail/arrayHelper'
// Initial state for store
const initialState = {
    locations: [],
    isFetching: false,
    dataFetched: false,
    error: false,
    defaultLocations: [],
};

const FAKE_DATA =   [{ 
    "date_create": "2019-10-12",
    locations: [
        {
            "id": "5da18a7638213a0ca03f7409",
            "address": " Xuân La, Tây Hồ, Hanoi, Vietnam",
            "time_create": "04:10",
            "date_create": "2019-10-12",
            "user_share": "Nguyen Van A"
        },
        {
            "id": "5da18a7638213a0ca03f7429",
            "address": " Thailand",
            "time_create": "04:10",
            "date_create": "2019-10-12",
            "user_share": "Nguyen van b"
        }
    ]
 }]

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
                locations: action.payload.locations,
                defaultLocations: action.payload.locations,
            };
        case types.GET_LOCATION_TABPART_FAIL:
            return {
                ...state,
                isFetching: false,
                dataFetched: false,
                error: true,
                locations: FAKE_DATA,
                defaultLocations: FAKE_DATA,
            }
        case types.SEARCH_LOCATION_TABPART:
            return {
                ...state,
                locations: searchAttributesArray(state.defaultLocations, action.payload, "user_share", "locations"),
            }
        default:
            return state;
    }
}