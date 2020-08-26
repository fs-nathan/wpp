import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { listProjectGroupDeletedFail, listProjectGroupDeletedSuccess } from '../../actions/projectGroup/listProjectGroupDeleted';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, LIST_PROJECT_GROUP_DELETED } from '../../constants/events';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../constants/snackbarController';

async function doListProjectGroupDeleted() {
    try {
        const config = {
            url: '/project-group/list-in-trash',
            method: 'get',
        }
        const result = await apiService(config);
        return result.data;
    } catch (error) {
        throw error;
    }
}

function* listProjectGroupDeleted(action) {
    try {
        const { project_groups: projectGroups } = yield call(doListProjectGroupDeleted);
        yield put(listProjectGroupDeletedSuccess({ projectGroups }, action.options));
        CustomEventEmitter(LIST_PROJECT_GROUP_DELETED.SUCCESS);
    } catch (error) {
        yield put(listProjectGroupDeletedFail(error, action.options));
        CustomEventEmitter(LIST_PROJECT_GROUP_DELETED.FAIL);
        SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
    }
}

export { listProjectGroupDeleted };