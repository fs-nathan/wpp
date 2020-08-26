import {
    LIST_PROJECT_GROUP_DELETED,
    LIST_PROJECT_GROUP_DELETED_SUCCESS,
    LIST_PROJECT_GROUP_DELETED_FAIL
} from "../../constants/actions/projectGroup/listProjectGroup";

export const listProjectGroupDeleted = (quite = false) => ({
    type: LIST_PROJECT_GROUP_DELETED,
    quite,
});

export const listProjectGroupDeletedSuccess = ({ projectGroups }, options) => ({
    type: LIST_PROJECT_GROUP_DELETED_SUCCESS,
    options,
    data: {
        projectGroups,
    },
});

export const listProjectGroupDeletedFail = (error, options) => ({
    type: LIST_PROJECT_GROUP_DELETED_FAIL,
    options,
    error,
});