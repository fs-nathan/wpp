import {
  GET_LIST_GROUP,
  GET_LIST_GROUP_FAIL,
  GET_LIST_GROUP_SUCCESS,
} from '../../constants/actions/groupUser/getListGroup';

export const getListGroup = (quite = false) => ({
  type: GET_LIST_GROUP,
  quite,
  options: {
  }
});

export const getListGroupSuccess = ({ invitations }) => ({
  type: GET_LIST_GROUP_SUCCESS,
  data: {
    invitations,
  }
});

export const getListGroupFail = (error) => ({
  type: GET_LIST_GROUP_FAIL,
  error: error,
});