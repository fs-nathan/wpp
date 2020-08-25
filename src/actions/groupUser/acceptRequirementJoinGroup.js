import {
  ACCEPT_REQUIREMENT_JOIN_GROUP,
  ACCEPT_REQUIREMENT_JOIN_GROUP_FAIL,
  ACCEPT_REQUIREMENT_JOIN_GROUP_SUCCESS,
} from '../../constants/actions/groupUser/acceptRequirementJoinGroup';

export const acceptRequirementJoinGroup = ({ requirementId }) => ({
  type: ACCEPT_REQUIREMENT_JOIN_GROUP,
  options: {
    requirementId,
  }
});

export const acceptRequirementJoinGroupSuccess = (options) => ({
  type: ACCEPT_REQUIREMENT_JOIN_GROUP_SUCCESS,
  options,
});

export const acceptRequirementJoinGroupFail = (error, options) => ({
  type: ACCEPT_REQUIREMENT_JOIN_GROUP_FAIL,
  options,
  error,
});