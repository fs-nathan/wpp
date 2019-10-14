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

export const sortUserSuccess = () => ({
  type: SORT_USER_SUCCESS,
});

export const sortUserFail = (error) => ({
  type: SORT_USER_FAIL,
  error: error,
});