import {
  SEARCH_USER,
  SEARCH_USER_FAIL,
  SEARCH_USER_SUCCESS,
  SEARCH_USER_RESET,
} from '../../constants/actions/groupUser/searchUser';

export const searchUser = ({ info }, quite = false) => ({
  type: SEARCH_USER,
  quite,
  options: {
    info,
  },
});

export const searchUserSuccess = ({ member }) => ({
  type: SEARCH_USER_SUCCESS,
  data: {
    member,
  },
});

export const searchUserFail = (error) => ({
  type: SEARCH_USER_FAIL,
  error: error,
});

export const searchUserReset = () => ({
  type: SEARCH_USER_RESET,
});