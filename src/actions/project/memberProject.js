import {
  MEMBER_PROJECT,
  MEMBER_PROJECT_FAIL,
  MEMBER_PROJECT_SUCCESS,
} from '../../constants/actions/project/memberProject';

export const memberProject = ({ projectId }, quite = false) => ({
  type: MEMBER_PROJECT,
  quite,
  options: {
    projectId,
  },
});

export const memberProjectSuccess = ({ membersAdded, membersFree }) => ({
  type: MEMBER_PROJECT_SUCCESS,
  data: {
    membersAdded,
    membersFree,
  }
});

export const memberProjectFail = (error) => ({
  type: MEMBER_PROJECT_FAIL,
  error: error,
});