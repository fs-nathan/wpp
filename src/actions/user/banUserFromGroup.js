import {
  BAN_USER_FROM_GROUP,
  BAN_USER_FROM_GROUP_FAIL,
  BAN_USER_FROM_GROUP_SUCCESS,
} from '../../constants/actions/user/banUserFromGroup';

export const banUserFromGroup = ({ userId }) => ({
  type: BAN_USER_FROM_GROUP,
  options: {
    userId,
  },
});

export const banUserFromGroupSuccess = (options) => ({
  type: BAN_USER_FROM_GROUP_SUCCESS,
  options,
});

export const banUserFromGroupFail = (error, options) => ({
  type: BAN_USER_FROM_GROUP_FAIL,
  options,
  error,
});