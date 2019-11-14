import { call, put } from 'redux-saga/effects';
import { addProjectRoleToMemberSuccess, addProjectRoleToMemberFail } from '../../actions/project/addProjectRoleToMember';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, ADD_PROJECT_ROLE_TO_MEMBER } from '../../constants/events';

async function doAddProjectRoleToMember({ projectId, memberId, roleId, }) {
  try {
    const config = {
      url: '/project/add-project-role-to-member',
      method: 'post',
      data: {
        project_id: projectId,
        member_id: memberId,
        role_id: roleId,
      },
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* addProjectRoleToMember(action) {
  try {
    yield call(doAddProjectRoleToMember, action.options);
    yield put(addProjectRoleToMemberSuccess());
    CustomEventEmitter(ADD_PROJECT_ROLE_TO_MEMBER);
  } catch (error) {
    yield put(addProjectRoleToMemberFail(error));
  }
}

export {
  addProjectRoleToMember,
}