import produce from "immer";
import findIndex from 'lodash/findIndex';
import uniq from 'lodash/uniq';
import * as actionTypes from '../../constants/actions/chat/chat';
import { UPDATE_PROJECT_CHAT, GET_PROJECT_LIST_BASIC_REQUEST } from "constants/actions/taskDetail/taskDetailConst";
import { forEach } from "lodash";

export const initialState = {
  chats: { data: [] },
  members: [],
  listStickers: [],
  listTasks: [],
  tagMembers: [],
  viewedChatMembers: [],
  emotionsList: [],
  searchChatKey: '',
  stickerKeyWord: '',
  uploadingPercent: {},
  isMore: false,
  isLoading: false,
  isLoadingSearch: false,
  isSending: false,
  isFails: false,
  isLoadingForward: false,
  isShowSendStatus: false,
  lastChat: {},
  isCreateRemind: false,
  isOpenCreateRemind: false,
  isOpenDetailRemind: false,
  dataRemind: {},
  isOpenDetailSubTask: false,
  dataSubTask: {},
  isOpenDetailOffer: false,
  dataOffer: null,
  isOpenDetailDemand: false,
  dataDemand: null,
  isOpenDetailMember: false,
  gridSettings: [],
  isOpenImagesListModal: false,
  imagesList: [],
  selectedImage: 0,
  createUser: {},
  pinnedRemind: null,
  isOpenShareFileModal: false,
  item: null,
  isOpenForward: false,
  contentForward: null,
  error: null,
  focusId: null,
  focusTopId: null,
};
/* eslint-disable default-case, no-param-reassign */
export default (state = initialState, action) => produce(state, draft => {
  switch (action.type) {
    case actionTypes.FETCH_LIST_CHAT:
      draft.chats = action.payload;
      break;
    case actionTypes.APPEND_CHAT:
      const idx = findIndex(draft.chats.data, ({ id }) => id && id === action.replaceId)
      // console.log('idx', idx, action.replaceId)
      if (idx !== -1) {
        const updateDate = { ...action.payload.data_chat }
        if (updateDate.images) {
          updateDate.images.forEach(img => {
            img.url = undefined;
            img.url_thumb = undefined;
          })
        }
        draft.chats.data.splice(idx, 1, updateDate)
      } else {
        draft.chats.data.unshift(action.payload.data_chat)
      }
      if (action.isHideSendStatus) {
        draft.isShowSendStatus = false;
      }
      draft.isMore = undefined;
      draft.focusId = null;
      draft.focusTopId = null;
      break;
    case actionTypes.FETCH_MEMBER_CHAT:
      draft.members = action.payload;
      break;
    case actionTypes.LOAD_CHAT: {
      const { chat_id, last_id, isMore, content } = action;
      draft.isLoading = true;
      draft.focusId = chat_id;
      draft.focusTopId = last_id;
      draft.chats.last_id = last_id || null;
      if (content) draft.isLoadingSearch = true;
      else draft.isLoadingSearch = !!chat_id;
      if (!chat_id && !last_id && !isMore) {
        draft.chats.data = [];
      }
      break;
    }
    case actionTypes.LOAD_CHAT_SUCCESS: {
      const { payload, isMore } = action;
      if (isMore) {
        draft.chats.data.push(...payload.data);
        draft.chats.paging = payload.paging;
        draft.chats.last_id = payload.last_id;
      } else {
        draft.chats = payload;
        draft.focusId = draft.focusId || 'chatStatusDiv';
      }
      draft.isMore = isMore;
      draft.isSending = false;
      draft.isFails = false;
      draft.isLoading = false;
      draft.lastChat = {};
      break;
    }
    case actionTypes.LOAD_CHAT_FAIL: {
      draft.isFails = true;
      draft.isLoading = false;
      draft.focusId = null;
      draft.focusTopId = null;
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
    case actionTypes.CHAT_FILE:
    case actionTypes.CHAT_FORWARD_FILE:
    case actionTypes.CREATE_CHAT_FILE_FROM_GOOGLE_DRIVER: {
      draft.error = null;
      break;
    }
    case actionTypes.CHAT_FORWARD_FILE_FAIL:
    case actionTypes.CHAT_FILE_FAIL:
    case actionTypes.CREATE_CHAT_FILE_FROM_GOOGLE_DRIVER_FAIL: {
      const { error } = action;
      draft.error = error;
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
    case actionTypes.FORWARD_CHAT: {
      draft.isLoadingForward = true;
      break;
    }
    case actionTypes.FORWARD_CHAT_SUCCESS: {
      const { payload } = action;
      draft.payload = payload;
      draft.isLoadingForward = false;
      break;
    }
    case actionTypes.FORWARD_CHAT_FAIL: {
      draft.isLoadingForward = false;
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
      if (!key) draft.isLoadingSearch = false;
      break;
    }
    case actionTypes.ON_UPLOADING: {
      const { percent, id } = action;
      draft.uploadingPercent[id] = percent;
      break;
    }
    case actionTypes.TAG_MEMBER: {
      const { index } = action;
      // const memberIndex = draft.tagMembers.indexOf(index)
      // if (memberIndex === -1)
      draft.tagMembers.push(index);
      draft.tagMembers = uniq(draft.tagMembers)
      // else
      //   draft.tagMembers.splice(memberIndex, 1);
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
      const { content, resendId } = action;
      draft.lastChat = content;
      draft.chats.data = draft.chats.data.map(
        (data) => (data.id !== resendId) ? data : { ...data, isFails: false }
      )
      draft.isFails = false;
      draft.isSending = true;
      draft.isShowSendStatus = true;
      break;
    }
    case actionTypes.CREATE_CHAT_TEXT_SUCCESS: {
      const { payload } = action;
      draft.payload = payload;
      draft.isSending = false;
      // draft.isShowSendStatus = false;
      break;
    }
    case actionTypes.CREATE_CHAT_TEXT_FAIL: {
      draft.isSending = false;
      draft.isShowSendStatus = false;
      draft.chats.data = draft.chats.data.map(
        (data) => (data.id !== action.id) ? data : { ...data, isFails: true }
      )
      break;
    }
    case actionTypes.GET_VIEWED_CHAT_SUCCESS: {
      const { payload } = action;
      draft.viewedChatMembers = payload.members;
      break;
    }
    case actionTypes.CHANGE_STICKER_KEYWORD: {
      const { payload } = action;
      draft.stickerKeyWord = payload;
      break;
    }
    case actionTypes.OPEN_DETAIL_REMIND: {
      const { isOpenDetailRemind, data } = action;
      draft.isOpenDetailRemind = isOpenDetailRemind;
      draft.dataRemind = data;
      break;
    }
    case actionTypes.OPEN_CREATE_REMIND: {
      const { isOpen, isCreate, data } = action;
      draft.isOpenCreateRemind = isOpen;
      draft.isCreateRemind = isCreate;
      draft.dataRemind = data;
      break;
    }
    case actionTypes.GET_REMIND_DETAIL_SUCCESS: {
      const { payload } = action;
      draft.dataRemind = payload;
      break;
    }
    case actionTypes.GET_SUBTASK_DETAIL_SUCCESS: {
      const { payload } = action;
      draft.dataSubTask = payload.sub_task;
      break;
    }
    case actionTypes.OPEN_DETAIL_SUB_TASK: {
      const { isOpenDetailSubTask, data } = action;
      draft.isOpenDetailSubTask = isOpenDetailSubTask;
      draft.dataSubTask = data;
      break;
    }
    case actionTypes.OPEN_DETAIL_OFFER: {
      const { isOpenDetailOffer, data } = action;
      draft.isOpenDetailOffer = isOpenDetailOffer;
      draft.dataOffer = data;
      break;
    }
    case actionTypes.OPEN_DETAIL_DEMAND: {
      const { isOpenDetailDemand, data } = action;
      draft.isOpenDetailDemand = isOpenDetailDemand;
      if (data)
        draft.dataDemand = data;
      break;
    }
    case actionTypes.GET_OFFER_DETAIL_SUCCESS: {
      const { payload } = action;
      draft.dataOffer = payload;
      break;
    }
    case actionTypes.GET_DEMAND_DETAIL_SUCCESS: {
      const { payload } = action;
      draft.dataDemand = payload.command;
      break;
    }
    case actionTypes.REMOVE_CHAT_BY_ID: {
      draft.chats.data = draft.chats.data.filter(({ id }) => id !== action.id)
      break;
    }
    case actionTypes.CREATE_CHAT_FILE_FROM_GOOGLE_DRIVER_SUCCESS: {
      const { payload } = action;
      draft.payload = payload;
      break;
    }
    case actionTypes.OPEN_DETAIL_MEMBER: {
      const { isOpen } = action;
      draft.isOpenDetailMember = isOpen;
      break;
    }
    case actionTypes.GET_GIRD_LIST_TASK_SUCCESS: {
      const { payload } = action;
      draft.gridSettings = payload.girds;
      break;
    }
    case actionTypes.UPDATE_CHAT_STATE: {
      const idx = findIndex(draft.chats.data, ({ id }) => id === action.id)
      // console.log('idx', idx, action.data);
      draft.chats.data[idx] = { ...draft.chats.data[idx], ...action.data }
      break;
    }
    case actionTypes.SHOW_IMAGES_LIST: {
      const { isOpen, images, selected, user } = action;
      draft.isOpenImagesListModal = isOpen;
      draft.imagesList = images;
      draft.selectedImage = selected;
      draft.createUser = user;
      break;
    }
    case actionTypes.GET_DATA_PIN_ON_TASK_CHAT_SUCCESS: {
      const { payload } = action;
      draft.pinnedRemind = payload.data_pin.remind;
      break;
    }
    case actionTypes.GET_DATA_PIN_ON_TASK_CHAT_FAIL: {
      draft.pinnedRemind = null;
      break;
    }
    case actionTypes.OPEN_SHARE_FILE_MODAL: {
      const { isOpenShareFileModal, item, } = action;
      draft.isOpenShareFileModal = isOpenShareFileModal;
      draft.item = item;
      break;
    }
    case actionTypes.FORWARD_MESSAGE: {
      const { isOpenForward, content } = action;
      draft.isOpenForward = isOpenForward;
      draft.contentForward = content;
      break;
    }
    case actionTypes.APPEND_VIEWED_CHAT: {
      const { data } = action;
      draft.viewedChatMembers.push(data);
      break;
    }
    case UPDATE_PROJECT_CHAT: {
      draft.viewedChatMembers = []
      break;
    }
    case GET_PROJECT_LIST_BASIC_REQUEST: {
      draft.isLoading = false;
      break;
    }
    case actionTypes.VIEW_CHAT_SUCCESS: {
      const { payload } = action;
      draft.payload = payload;
      break;
    }
    case actionTypes.CLEAR_FOCUS: {
      draft.focusId = null;
      draft.focusTopId = null;
      break;
    }
  }
});
