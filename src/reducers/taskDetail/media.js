// Import actions
import * as types from '../../constants/actions/taskDetail/taskDetailConst'
import { searchAttributesArray, searchArrayTabpart } from '../../helpers/jobDetail/arrayHelper'

// Initial state for store
const initialState = {
    image: [],
    file: [],
    isFetching: false,
    dataFetched: false,
    error: false,
    links: [],
    detailImage: [],
    detailFile: [],
    detailLink: [],
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case types.GET_IMAGE_TABPART_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case types.GET_IMAGE_TABPART_SUCCESS: {
            const { isMore, payload } = action;
            const images = isMore ?
                [...state.detailImage, ...payload.images]
                : payload.images
            return {
                ...state,
                isFetching: false,
                dataFetched: true,
                image: { ...state.image, ...payload, images },
                detailImage: images
            };
        }
        case types.GET_IMAGE_TABPART_FAIL:
            return {
                ...state,
                isFetching: false,
                dataFetched: false,
                error: true,
            }
        case types.GET_FILE_TABPART_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case types.GET_FILE_TABPART_SUCCESS:
            const { isMore, payload } = action;
            const files = isMore ?
                [...state.detailFile, ...payload.files]
                : payload.files
            return {
                ...state,
                isFetching: false,
                dataFetched: true,
                file: { ...state.file, ...payload, files },
                detailFile: files
            };
        case types.GET_FILE_TABPART_FAIL:
            return {
                ...state,
                isFetching: false,
                dataFetched: false,
                error: true,
            }
        case types.GET_LINK_TABPART_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case types.GET_LINK_TABPART_SUCCESS:
            return {
                ...state,
                isFetching: false,
                dataFetched: true,
                links: action.payload,
                detailLink: action.payload.links,
            };
        case types.GET_LINK_TABPART_FAIL:
            return {
                ...state,
                isFetching: false,
                dataFetched: false,
                error: true,
            }
        case types.SEARCH_IMAGES_TABPART:
            return {
                ...state,
                image: { images: searchAttributesArray(state.detailImage, action.payload, "date_create", "images") }
            }
        case types.SEARCH_FILE_TABPART:
            return {
                ...state,
                file: { files: searchArrayTabpart(state.detailFile, action.payload, "name") }
            }
        case types.SEARCH_LINK_TABPART:
            return {
                ...state,
                links: { links: searchAttributesArray(state.detailLink, action.payload, "date_create", "links") }
            }
        default:
            return state;
    }
}