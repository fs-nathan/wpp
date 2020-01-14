import {
  GET_REQUIREMENT_JOIN_GROUP,
  GET_REQUIREMENT_JOIN_GROUP_FAIL,
  GET_REQUIREMENT_JOIN_GROUP_SUCCESS,
} from '../../constants/actions/groupUser/getRequirementJoinGroup';

export const getRequirementJoinGroup = (quite = false) => ({
  type: GET_REQUIREMENT_JOIN_GROUP,
  quite,
});

export const getRequirementJoinGroupSuccess = ({ requirements }) => ({
  type: GET_REQUIREMENT_JOIN_GROUP_SUCCESS,
  data: {
    requirements,
  }
});

export const getRequirementJoinGroupFail = (error) => ({
  type: GET_REQUIREMENT_JOIN_GROUP_FAIL,
  error: error,
});