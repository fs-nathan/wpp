import produce from "immer";
import * as actionTypes from '../../constants/actions/chat/chat';

export const initialState = {
  chats: {},
  members: [],
  listStickers: [],
  listTasks: [],
  tagMembers: [],
  viewedChatMembers: [],
  emotionsList: [],
  searchChatKey: '',
  uploadingPercent: 0,
  isSending: false,
  isFails: false,
  isShowSendStatus: false,
  lastChat: {},
};
/* eslint-disable default-case, no-param-reassign */
export default (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case actionTypes.FETCH_LIST_CHAT:
        draft.chats = action.payload;
        break;
      case actionTypes.APPEND_CHAT:
        draft.chats.data.unshift(action.payload.data_chat)
        draft.isSending = true;
        draft.isShowSendStatus = true;
        break;
      case actionTypes.FETCH_MEMBER_CHAT:
        draft.members = action.payload;
        break;
      case actionTypes.LOAD_CHAT_SUCCESS: {
        const { payload, isMore } = action;
        if (isMore) {
          draft.chats.data.push(...payload.data);
          draft.chats.paging = payload.paging;
        } else {
          draft.chats = payload;
        }
        draft.isSending = false;
        draft.isFails = false;
        draft.lastChat = {};
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
      case actionTypes.LOAD_LIST_TASK_SUCCESS: {
        const { payload } = action;
        draft.listTasks = payload.tasks;
        break;
      }
      case actionTypes.SEARCH_CHAT: {
        const { key } = action;
        draft.searchChatKey = key;
        break;
      }
      case actionTypes.ON_UPLOADING: {
        const { percent } = action;
        draft.uploadingPercent = percent;
        break;
      }
      case actionTypes.TAG_MEMBER: {
        const { index } = action;
        const memberIndex = draft.tagMembers.indexOf(index)
        if (memberIndex === -1)
          draft.tagMembers.push(index);
        else
          draft.tagMembers.splice(memberIndex, 1);
        break;
      }
      case actionTypes.CLEAR_TAGS: {
        draft.tagMembers = []
        break;
      }
      case actionTypes.GET_EMOTIONS_SUCCESS: {
        const { payload } = action;
        draft.emotionsList = payload.imotions;
        break;
      }
      case actionTypes.CHAT_EMOTION_SUCCESS: {
        const { payload } = action;
        draft.payload = payload;
        break;
      }
      case actionTypes.GET_EMOTIONS_REACT_MEMBER_SUCCESS: {
        const { payload } = action;
        draft.payload = payload;
        break;
      }
      case actionTypes.CREATE_CHAT_TEXT: {
        const { content } = action;
        draft.lastChat = content;
        draft.isFails = false;
        break;
      }
      case actionTypes.CREATE_CHAT_TEXT_SUCCESS: {
        const { payload } = action;
        draft.payload = payload;
        break;
      }
      case actionTypes.CREATE_CHAT_TEXT_FAIL: {
        draft.isFails = true;
        break;
      }
      case actionTypes.GET_VIEWED_CHAT_SUCCESS: {
        const { payload } = action;
        draft.viewedChatMembers = payload.members;
        break;
      }
    }
  });
