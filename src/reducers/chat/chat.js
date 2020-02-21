import * as actionTypes from '../../constants/actions/chat/chat';

export const initialState = {
  chats: {},
  members: []
};

const chat = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_LIST_CHAT:
      return { ...state, chats: action.payload };
    case actionTypes.FETCH_MEMBER_CHAT:
      return { ...state, members: action.payload };
    default:
      return state;
  }
};

export default chat;
