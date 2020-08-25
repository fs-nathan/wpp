import {
  PRIVATE_MEMBER,
  PRIVATE_MEMBER_FAIL,
  PRIVATE_MEMBER_SUCCESS,
} from '../../constants/actions/user/privateMember';

export const privateMember = ({ userId }) => ({
  type: PRIVATE_MEMBER,
  options: {
    userId,
  },
});

export const privateMemberSuccess = (options) => ({
  type: PRIVATE_MEMBER_SUCCESS,
  options,
});

export const privateMemberFail = (error, options) => ({
  type: PRIVATE_MEMBER_FAIL,
  options,
  error,
});