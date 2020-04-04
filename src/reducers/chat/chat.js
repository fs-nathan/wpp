import produce from "immer";
import * as actionTypes from '../../constants/actions/chat/chat';

export const initialState = {
  chats: {},
  members: []
};
/* eslint-disable default-case, no-param-reassign */
export default (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case actionTypes.FETCH_LIST_CHAT:
        draft.chats = action.payload;
        break;
      case actionTypes.APPEND_CHAT:
        draft.chats.data.push(action.payload.data_chat)
        break;
      case actionTypes.FETCH_MEMBER_CHAT:
        draft.members = action.payload;
        break;
    }
  });
