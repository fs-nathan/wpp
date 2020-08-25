import {
  GET_REQUIREMENT_JOIN_GROUP,
  GET_REQUIREMENT_JOIN_GROUP_FAIL,
  GET_REQUIREMENT_JOIN_GROUP_SUCCESS,
  GET_REQUIREMENT_JOIN_GROUP_RESET,
} from '../../constants/actions/groupUser/getRequirementJoinGroup';

export const getRequirementJoinGroup = (quite = false) => ({
  type: GET_REQUIREMENT_JOIN_GROUP,
  quite,
});

export const getRequirementJoinGroupSuccess = ({ requirements }, options) => ({
  type: GET_REQUIREMENT_JOIN_GROUP_SUCCESS,
  options,
  data: {
    requirements,
  }
});

export const getRequirementJoinGroupFail = (error, options) => ({
  type: GET_REQUIREMENT_JOIN_GROUP_FAIL,
  options,
  error,
});

export const getRequirementJoinGroupReset = () => ({
  type: GET_REQUIREMENT_JOIN_GROUP_RESET,
})