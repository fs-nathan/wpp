// Import actions
import * as types from '../../constants/actions/taskDetail/taskDetailConst'
import { searchAttributesArray, searchArrayTabpart} from '../../helpers/jobDetail/arrayHelper'
// let fakeLink = [
//     {
//         "date_create": "2019-10-26",
//         "links": [
//             {
//                 "id": "5db3d8bfac87af0e44aaf78d",
//                 "url": "https://storage.googleapis.com/storage_vtask_net/1572067517748-8c55033f3ff4daaa83e5.jpg",
//                 "date_create": "2019-10-26"
//             }
//         ]
//     }
// ]

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
        case types.GET_IMAGE_TABPART_SUCCESS:
            return {
                ...state,
                isFetching: false,
                dataFetched: true,
                image: action.payload,
                detailImage: action.payload.images
            };
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
            return {
                ...state,
                isFetching: false,
                dataFetched: true,
                file: action.payload,
                detailFile: action.payload.files
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
                image: {images: searchAttributesArray(state.detailImage, action.payload, "date_create", "images")}
            }
        case types.SEARCH_FILE_TABPART:
            return {
                ...state,
                file: {files: searchArrayTabpart(state.detailFile, action.payload, "name")}
            }
        case types.SEARCH_LINK_TABPART:
            return {
                ...state,
                links: {links: searchAttributesArray(state.detailLink, action.payload, "date_create", "links")}
            }
        default:
            return state;
    }
}