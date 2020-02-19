import {
  SORT_USER,
  SORT_USER_FAIL,
  SORT_USER_SUCCESS,
} from '../../constants/actions/user/sortUser';

export const sortUser = ({ userId, roomId, sortIndex }) => ({
  type: SORT_USER,
  options: {
    userId,
    roomId,
    sortIndex,
  },
});

export const sortUserSuccess = (options) => ({
  type: SORT_USER_SUCCESS,
  options,
});

export const sortUserFail = (error, options) => ({
  type: SORT_USER_FAIL,
  options,
  error,
});