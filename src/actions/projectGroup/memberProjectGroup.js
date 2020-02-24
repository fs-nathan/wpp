import {
  MEMBER_PROJECT_GROUP,
  MEMBER_PROJECT_GROUP_FAIL,
  MEMBER_PROJECT_GROUP_SUCCESS,
  MEMBER_PROJECT_GROUP_RESET,
} from '../../constants/actions/projectGroup/memberProjectGroup';

export const memberProjectGroup = ({ projectGroupId }, quite = false) => ({
  type: MEMBER_PROJECT_GROUP,
  quite,
  options: {
    projectGroupId,
  }
});

export const memberProjectGroupSuccess = ({ members }, options) => ({
  type: MEMBER_PROJECT_GROUP_SUCCESS,
  options,
  data: {
    members,
  },
});

export const memberProjectGroupFail = (error, options) => ({
  type: MEMBER_PROJECT_GROUP_FAIL,
  options,
  error,
});

export const memberProjectGroupReset = () => ({
  type: MEMBER_PROJECT_GROUP_RESET,
});