import { call, put } from 'redux-saga/effects';
import { editProjectGroupSuccess, editProjectGroupFail } from '../../actions/projectGroup/editProjectGroup';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, EDIT_PROJECT_GROUP } from '../../constants/events';

async function doEditProjectGroup({ projectGroupId, name, icon, description }) {
  try {
    const config = {
      url: '/project-group/update',
      method: 'put',
      data: {
        project_group_id: projectGroupId,
        name,
        icon,
        description,
      },
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* editProjectGroup(action) {
  try {
    yield call(doEditProjectGroup, action.options);
    yield put(editProjectGroupSuccess());
    CustomEventEmitter(EDIT_PROJECT_GROUP);
  } catch (error) {
    yield put(editProjectGroupFail(error));
  }
}

export {
  editProjectGroup,
}
