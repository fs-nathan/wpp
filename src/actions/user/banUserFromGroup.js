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

export const banUserFromGroupSuccess = () => ({
  type: BAN_USER_FROM_GROUP_SUCCESS,
});

export const banUserFromGroupFail = (error) => ({
  type: BAN_USER_FROM_GROUP_FAIL,
  error: error,
});