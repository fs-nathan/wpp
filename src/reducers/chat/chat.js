import produce from "immer";
import * as actionTypes from '../../constants/actions/chat/chat';

export const initialState = {
  chats: {},
  members: [],
  listStickers: [],
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
      case actionTypes.LOAD_CHAT_SUCCESS: {
        const { payload } = action;
        draft.chats = payload;
        break;
      }
      case actionTypes.CHAT_IMAGE_SUCCESS: {
        const { payload } = action;
        draft.payload = payload;
        break;
      }
      case actionTypes.CHAT_FILE_SUCCESS: {
        const { payload } = action;
        draft.payload = payload;
        break;
      }
      case actionTypes.CHAT_FORWARD_FILE_SUCCESS: {
        const { payload } = action;
        draft.payload = payload;
        break;
      }
      case actionTypes.CHAT_STICKER_SUCCESS: {
        const { payload } = action;
        draft.payload = payload;
        break;
      }
      case actionTypes.GET_CHAT_NOT_VIEWED_SUCCESS: {
        const { payload } = action;
        draft.payload = payload;
        break;
      }
      case actionTypes.GET_NOTI_CHAT_SUCCESS: {
        const { payload } = action;
        draft.payload = payload;
        break;
      }
      case actionTypes.FORWARD_CHAT_SUCCESS: {
        const { payload } = action;
        draft.payload = payload;
        break;
      }
      case actionTypes.GET_LIST_STICKERS_SUCCESS: {
        const { payload } = action;
        draft.listStickers = payload.stickers;
        break;
      }
    }
  });
