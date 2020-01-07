import {
  MEMBER_PROJECT_GROUP,
  MEMBER_PROJECT_GROUP_FAIL,
  MEMBER_PROJECT_GROUP_SUCCESS,
} from '../../constants/actions/projectGroup/memberProjectGroup';

export const memberProjectGroup = ({ projectGroupId }, quite = false) => ({
  type: MEMBER_PROJECT_GROUP,
  quite,
  options: {
    projectGroupId,
  }
});

export const memberProjectGroupSuccess = ({ members }) => ({
  type: MEMBER_PROJECT_GROUP_SUCCESS,
  data: {
    members,
  },
});

export const memberProjectGroupFail = (error) => ({
  type: MEMBER_PROJECT_GROUP_FAIL,
  error: error,
});