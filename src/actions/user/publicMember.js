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

export const publicMemberSuccess = () => ({
  type: PUBLIC_MEMBER_SUCCESS,
});

export const publicMemberFail = (error) => ({
  type: PUBLIC_MEMBER_FAIL,
  error: error,
});