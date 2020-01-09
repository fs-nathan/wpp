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

export const rejectRequirementJoinGroupSuccess = () => ({
  type: REJECT_REQUIREMENT_JOIN_GROUP_SUCCESS,
});

export const rejectRequirementJoinGroupFail = (error) => ({
  type: REJECT_REQUIREMENT_JOIN_GROUP_FAIL,
  error: error,
});