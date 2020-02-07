import {
  INVITE_OTHER_PEOPLE_CREATE_ACCOUNT,
  INVITE_OTHER_PEOPLE_CREATE_ACCOUNT_FAIL,
  INVITE_OTHER_PEOPLE_CREATE_ACCOUNT_SUCCESS,
} from '../../constants/actions/register/inviteOtherPeopleCreateAccount';

export const inviteOtherPeopleCreateAccount = ({ email }) => ({
  type: INVITE_OTHER_PEOPLE_CREATE_ACCOUNT,
  options: {
    email,
  },
});

export const inviteOtherPeopleCreateAccountSuccess = () => ({
  type: INVITE_OTHER_PEOPLE_CREATE_ACCOUNT_SUCCESS,
});

export const inviteOtherPeopleCreateAccountFail = (error) => ({
  type: INVITE_OTHER_PEOPLE_CREATE_ACCOUNT_FAIL,
  error: error,
});