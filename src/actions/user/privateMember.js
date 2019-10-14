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

export const privateMemberSuccess = () => ({
  type: PRIVATE_MEMBER_SUCCESS,
});

export const privateMemberFail = (error) => ({
  type: PRIVATE_MEMBER_FAIL,
  error: error,
});