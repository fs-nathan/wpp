// Import actions
import * as types from '../../constants/actions/taskDetail/taskDetailConst'
import {
    filterPendingItem, filterApprovedItem
} from '../../helpers/jobDetail/arrayHelper'


// Initial state for store
const initialState = {
    offer: [],
    isFetching: false,
    dataFetched: false,
    error: false,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case types.GET_OFFER_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case types.GET_OFFER_SUCCESS:
            return {
                ...state,
                isFetching: false,
                dataFetched: true,
                offer: action.payload.offers,
                pendingItems: filterPendingItem(action.payload.offers),
                approvedItems: filterApprovedItem(action.payload.offers),
            };
        case types.GET_OFFER_FAIL:
            return {
                ...state,
                isFetching: false,
                dataFetched: false,
                error: true,
            }
        case types.CREATE_OFFER_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case types.CREATE_OFFER_SUCCESS:
            return {
                ...state,
                isFetching: false,
                dataFetched: true,
            };

        case types.CREATE_OFFER_FAIL:
            return {
                ...state,
                isFetching: false,
                dataFetched: false,
                error: true,
            }
        case types.UPDATE_OFFER_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case types.UPDATE_OFFER_SUCCESS:
            return {
                ...state,
                isFetching: false,
                dataFetched: true
            }
        case types.UPDATE_OFFER_FAIL:
            return {
                ...state,
                isFetching: false,
                dataFetched: false,
                error: true,
            }
        case types.DELETE_OFFER_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case types.DELETE_OFFER_SUCCESS:
            return {
                ...state,
                isFetching: false,
                dataFetched: true
            }
        case types.DELETE_OFFER_FAIL:
            return {
                ...state,
                isFetching: false,
                dataFetched: false,
                error: true,
            }
        default:
            return state;
    }
}