// Import actions
import * as types from '../../constants/actions/taskDetail/taskDetailConst'
import {
    filterPendingItem, filterApprovedItem,searchArrayTabpart
} from '../../helpers/jobDetail/arrayHelper'


// Initial state for store
const initialState = {
    offer: [], pendingItems : [], approvedItems : [],
    defaultOffer: [], defaultPendingItems : [], defaultApprovedItems : [],
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
                offer: action.payload.offers.reverse(),
                pendingItems: filterPendingItem(action.payload.offers.reverse()),
                approvedItems: filterApprovedItem(action.payload.offers.reverse()),
                defaultOffer: action.payload.offers.reverse(),
                defaultPendingItems: filterPendingItem(action.payload.offers.reverse()),
                defaultApprovedItems: filterPendingItem(action.payload.offers.reverse()),
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
        case types.UPLOAD_DOCUMENT_TO_OFFER_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case types.UPLOAD_DOCUMENT_TO_OFFER_SUCCESS:
            return {
                ...state,
                isFetching: false,
                dataFetched: true
            }
        case types.UPLOAD_DOCUMENT_TO_OFFER_FAIL:
            return {
                ...state,
                isFetching: false,
                dataFetched: false,
                error: true,
            }
        case types.DELETE_DOCUMENT_TO_OFFER_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case types.DELETE_DOCUMENT_TO_OFFER_SUCCESS:
            return {
                ...state,
                isFetching: false,
                dataFetched: true
            }
        case types.DELETE_DOCUMENT_TO_OFFER_FAIL:
            return {
                ...state,
                isFetching: false,
                dataFetched: false,
                error: true,
            }
        case types.HANDLE_OFFER_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case types.HANDLE_OFFER_SUCCESS:
            return {
                ...state,
                isFetching: false,
                dataFetched: true
            }
        case types.HANDLE_OFFER_FAIL:
            return {
                ...state,
                isFetching: false,
                dataFetched: false,
                error: true,
            }
        case types.SEARCH_OFFER_TABPART:
            return {
                ...state,
                offer: searchArrayTabpart(state.defaultOffer, action.payload, "content"),
                pendingItems: searchArrayTabpart(state.defaultPendingItems, action.payload, "content"),
                approvedItems: searchArrayTabpart(state.defaultApprovedItems, action.payload, "content"),
            }
        default:
            return state;
    }
}