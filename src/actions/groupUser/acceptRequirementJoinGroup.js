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

export const acceptRequirementJoinGroupSuccess = () => ({
  type: ACCEPT_REQUIREMENT_JOIN_GROUP_SUCCESS,
});

export const acceptRequirementJoinGroupFail = (error) => ({
  type: ACCEPT_REQUIREMENT_JOIN_GROUP_FAIL,
  error: error,
});