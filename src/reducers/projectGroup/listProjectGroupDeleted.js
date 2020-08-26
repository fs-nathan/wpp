import { LIST_PROJECT_GROUP_DELETED, LIST_PROJECT_GROUP_DELETED_FAIL, LIST_PROJECT_GROUP_DELETED_SUCCESS } from '../../constants/actions/projectGroup/listProjectGroup';

export const initialState = {
    data: {
        projectGroups: [],
    },
    error: null,
    loading: false,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case LIST_PROJECT_GROUP_DELETED:
            return {
                ...state,
                error: null,
                loading: action.quite ? false : true,
            };
        case LIST_PROJECT_GROUP_DELETED_SUCCESS:
            return {
                ...state,
                data: action.data,
                error: null,
                loading: false
            };
        case LIST_PROJECT_GROUP_DELETED_FAIL:
            return {
                ...state,
                error: action.error,
                loading: false,
            };
        default:
            return state;
    }
}

export default reducer;