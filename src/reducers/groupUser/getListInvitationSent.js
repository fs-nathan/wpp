import { GET_LIST_INVITATION_SENT, GET_LIST_INVITATION_SENT_FAIL, GET_LIST_INVITATION_SENT_SUCCESS } from '../../constants/actions/groupUser/getListInvitationSent';

export const initialState = {
  data: {
    invitations: [],
  },
  error: null,
  loading: false,
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
        ...initialState,
        data: action.data,
        error: null,
        loading: false,
      };
    case GET_LIST_INVITATION_SENT_FAIL:
      return {
        ...state,
        ...initialState,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
}

export default reducer;