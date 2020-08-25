import { GET_LIST_INVITATION_SENT, GET_LIST_INVITATION_SENT_FAIL, GET_LIST_INVITATION_SENT_SUCCESS } from '../../constants/actions/groupUser/getListInvitationSent';

export const initialState = {
  data: {
    invitations: [],
  },
  error: null,
  loading: false,
  firstTime: true,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_LIST_INVITATION_SENT:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case GET_LIST_INVITATION_SENT_SUCCESS:
      return {
        ...state,
        data: action.data,
        error: null,
        loading: false,
        firstTime: false,
      };
    case GET_LIST_INVITATION_SENT_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
        firstTime: false,
      };
    default:
      return state;
  }
}

export default reducer;