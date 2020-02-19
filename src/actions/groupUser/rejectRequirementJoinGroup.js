import {
  REJECT_REQUIREMENT_JOIN_GROUP,
  REJECT_REQUIREMENT_JOIN_GROUP_FAIL,
  REJECT_REQUIREMENT_JOIN_GROUP_SUCCESS,
} from '../../constants/actions/groupUser/rejectRequirementJoinGroup';

export const rejectRequirementJoinGroup = ({ requirementId }) => ({
  type: REJECT_REQUIREMENT_JOIN_GROUP,
  options: {
    requirementId,
  }
});

export const rejectRequirementJoinGroupSuccess = (options) => ({
  type: REJECT_REQUIREMENT_JOIN_GROUP_SUCCESS,
  options,
});

export const rejectRequirementJoinGroupFail = (error, options) => ({
  type: REJECT_REQUIREMENT_JOIN_GROUP_FAIL,
  options,
  error,
});