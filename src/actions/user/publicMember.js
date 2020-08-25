import {
  PUBLIC_MEMBER,
  PUBLIC_MEMBER_FAIL,
  PUBLIC_MEMBER_SUCCESS,
} from '../../constants/actions/user/publicMember';

export const publicMember = ({ userId }) => ({
  type: PUBLIC_MEMBER,
  options: {
    userId,
  },
});

export const publicMemberSuccess = (options) => ({
  type: PUBLIC_MEMBER_SUCCESS,
  options,
});

export const publicMemberFail = (error, options) => ({
  type: PUBLIC_MEMBER_FAIL,
  options,
  error,
});