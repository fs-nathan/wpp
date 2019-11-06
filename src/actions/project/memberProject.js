import {
  MEMBER_PROJECT,
  MEMBER_PROJECT_FAIL,
  MEMBER_PROJECT_SUCCESS,
} from '../../constants/actions/project/memberProject';

export const memberProject = ({ projectId }) => ({
  type: MEMBER_PROJECT,
  options: {
    projectId,
  },
});

export const memberProjectSuccess = ({ members }) => ({
  type: MEMBER_PROJECT_SUCCESS,
  data: {
    members,
  }
});

export const memberProjectFail = (error) => ({
  type: MEMBER_PROJECT_FAIL,
  error: error,
});