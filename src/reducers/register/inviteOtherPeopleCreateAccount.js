import {
  INVITE_OTHER_PEOPLE_CREATE_ACCOUNT,
  INVITE_OTHER_PEOPLE_CREATE_ACCOUNT_SUCCESS,
  INVITE_OTHER_PEOPLE_CREATE_ACCOUNT_FAIL,
} from '../../constants/actions/register/inviteOtherPeopleCreateAccount';

export const initialState = {
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case INVITE_OTHER_PEOPLE_CREATE_ACCOUNT:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case INVITE_OTHER_PEOPLE_CREATE_ACCOUNT_SUCCESS: 
      return {
        ...state, 
        error: null,
        loading: false,
      };
    case INVITE_OTHER_PEOPLE_CREATE_ACCOUNT_FAIL:
      return {
        ...state,
        error: action.error,
        loadling: false,
      };
    default:
      return state;
  }
}

export default reducer;