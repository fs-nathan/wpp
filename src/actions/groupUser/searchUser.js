import {
  SEARCH_USER,
  SEARCH_USER_FAIL,
  SEARCH_USER_SUCCESS,
} from '../../constants/actions/user/searchUser';

export const searchUser = ({ info }) => ({
  type: SEARCH_USER,
  options: {
    info,
  },
});

export const searchUserSuccess = ({ data }) => ({
  type: SEARCH_USER_SUCCESS,
  data: {
    data,
  },
});

export const searchUserFail = (error) => ({
  type: SEARCH_USER_FAIL,
  error: error,
});