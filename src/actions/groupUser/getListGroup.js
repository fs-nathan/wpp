import {
  GET_LIST_GROUP,
  GET_LIST_GROUP_FAIL,
  GET_LIST_GROUP_SUCCESS,
  GET_LIST_GROUP_RESET,
} from '../../constants/actions/groupUser/getListGroup';

export const getListGroup = (quite = false) => ({
  type: GET_LIST_GROUP,
  quite,
  options: {
  }
});

export const getListGroupSuccess = ({ invitations }, options) => ({
  type: GET_LIST_GROUP_SUCCESS,
  options,
  data: {
    invitations,
  }
});

export const getListGroupFail = (error, options) => ({
  type: GET_LIST_GROUP_FAIL,
  options,
  error,
});

export const getListGroupReset = () => ({
  type: GET_LIST_GROUP_RESET,
});