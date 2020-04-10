import * as actionTypes from '../../constants/actions/chat/chat';
import { apiService } from '../../constants/axiosInstance';

// action
export const getListChat = data => ({
  type: actionTypes.FETCH_LIST_CHAT,
  payload: data
});

export const appendChat = data => ({
  type: actionTypes.APPEND_CHAT,
  payload: data
});

export const getMemberTask = data => ({
  type: actionTypes.FETCH_MEMBER_CHAT,
  payload: data
});

// service
export const getMemberTaskService = task_id => {
  return apiService({
    method: 'get',
    url: 'task/get-member',
    params: { task_id }
  });
};
export const createChatText = data => {
  return apiService({ method: 'post', url: '/task/create-chat-text', data });
};
export const createChatImg = data => {
  return apiService({ method: 'post', url: '/task/create-chat-image', data });
};
export const createChatFile = data => {
  return apiService({ method: 'post', url: '/task/create-chat-file', data });
};

export function deleteChat(task_id, chat_id) {
  return {
    type: actionTypes.DELETE_CHAT,
    task_id, chat_id,
  };
}

export function deleteChatSuccess(payload) {
  return {
    type: actionTypes.DELETE_CHAT_SUCCESS,
    payload,
  };
}

export function deleteChatFail(error) {
  return {
    type: actionTypes.DELETE_CHAT_FAIL,
    error,
  };
}

export function loadChat(taskId, page) {
  return {
    type: actionTypes.LOAD_CHAT,
    task_id: taskId,
    page,
  };
}

export function loadChatSuccess(payload) {
  return {
    type: actionTypes.LOAD_CHAT_SUCCESS,
    payload,
  };
}

export function loadChatFail(error) {
  return {
    type: actionTypes.LOAD_CHAT_FAIL,
    error,
  };
}


export function chatImage(task_id, data, onUploading) {
  return {
    type: actionTypes.CHAT_IMAGE,
    task_id, data, onUploading,
  };
}

export function chatImageSuccess(payload) {
  return {
    type: actionTypes.CHAT_IMAGE_SUCCESS,
    payload,
  };
}

export function chatImageFail(error) {
  return {
    type: actionTypes.CHAT_IMAGE_FAIL,
    error,
  };
}

export function chatFile(task_id, data, onUploading) {
  return {
    type: actionTypes.CHAT_FILE,
    task_id,
    data,
    onUploading,
  };
}

export function chatFileSuccess(payload, onUploading) {
  return {
    type: actionTypes.CHAT_FILE_SUCCESS,
    payload, onUploading,
  };
}

export function chatFileFail(error) {
  return {
    type: actionTypes.CHAT_FILE_FAIL,
    error,
  };
}

export function chatForwardFile(file) {
  return {
    type: actionTypes.CHAT_FORWARD_FILE,
    file,
  };
}

export function chatForwardFileSuccess(payload) {
  return {
    type: actionTypes.CHAT_FORWARD_FILE_SUCCESS,
    payload,
  };
}

export function chatForwardFileFail(error) {
  return {
    type: actionTypes.CHAT_FORWARD_FILE_FAIL,
    error,
  };
}

export function chatSticker(task_id, sticker_id) {
  return {
    type: actionTypes.CHAT_STICKER,
    task_id,
    sticker_id,
  };
}

export function chatStickerSuccess(payload) {
  return {
    type: actionTypes.CHAT_STICKER_SUCCESS,
    payload,
  };
}

export function chatStickerFail(error) {
  return {
    type: actionTypes.CHAT_STICKER_FAIL,
    error,
  };
}

export function getChatNotViewed(taskId) {
  return {
    type: actionTypes.GET_CHAT_NOT_VIEWED,
    taskId,
  };
}

export function getChatNotViewedSuccess(payload) {
  return {
    type: actionTypes.GET_CHAT_NOT_VIEWED_SUCCESS,
    payload,
  };
}

export function getChatNotViewedFail(error) {
  return {
    type: actionTypes.GET_CHAT_NOT_VIEWED_FAIL,
    error,
  };
}

export function getNotiChat(taskId) {
  return {
    type: actionTypes.GET_NOTI_CHAT,
    taskId,
  };
}

export function getNotiChatSuccess(payload) {
  return {
    type: actionTypes.GET_NOTI_CHAT_SUCCESS,
    payload,
  };
}

export function getNotiChatFail(error) {
  return {
    type: actionTypes.GET_NOTI_CHAT_FAIL,
    error,
  };
}

export function forwardChat(task_id,
  chat_id,
  forward_to) {
  return {
    type: actionTypes.FORWARD_CHAT,
    task_id,
    chat_id,
    forward_to,
  };
}

export function forwardChatSuccess(payload) {
  return {
    type: actionTypes.FORWARD_CHAT_SUCCESS,
    payload,
  };
}

export function forwardChatFail(error) {
  return {
    type: actionTypes.FORWARD_CHAT_FAIL,
    error,
  };
}
export function getListStickersRequest(chatId) {
  return {
    type: actionTypes.GET_LIST_STICKERS,
    chatId,
  };
}

export function getListStickersSuccess(payload) {
  return {
    type: actionTypes.GET_LIST_STICKERS_SUCCESS,
    payload,
  };
}

export function getListStickersFail(error) {
  return {
    type: actionTypes.GET_LIST_STICKERS_FAIL,
    error,
  };
}

export function loadListTask(projectId) {
  return {
    type: actionTypes.LOAD_LIST_TASK,
    projectId,
  };
}

export function loadListTaskSuccess(payload) {
  return {
    type: actionTypes.LOAD_LIST_TASK_SUCCESS,
    payload,
  };
}

export function loadListTaskFail(error) {
  return {
    type: actionTypes.LOAD_LIST_TASK_FAIL,
    error,
  };
}

export function searchChat(key) {
  return {
    type: actionTypes.SEARCH_CHAT,
    key,
  };
}

export function onUploading(percent) {
  return {
    type: actionTypes.ON_UPLOADING,
    percent,
  };
}

export function tagMember(index) {
  return {
    type: actionTypes.TAG_MEMBER,
    index,
  };
}

export function clearTags() {
  return {
    type: actionTypes.CLEAR_TAGS,
  };
}

export function getEmotions(task) {
  return {
    type: actionTypes.GET_EMOTIONS,
    task,
  };
}

export function getEmotionsSuccess(payload) {
  return {
    type: actionTypes.GET_EMOTIONS_SUCCESS,
    payload,
  };
}

export function getEmotionsFail(error) {
  return {
    type: actionTypes.GET_EMOTIONS_FAIL,
    error,
  };
}

export function chatEmotion(task_id, chat_id, emotion) {
  return {
    type: actionTypes.CHAT_EMOTION,
    task_id, chat_id, emotion,
  };
}

export function chatEmotionSuccess(payload) {
  return {
    type: actionTypes.CHAT_EMOTION_SUCCESS,
    payload,
  };
}

export function chatEmotionFail(error) {
  return {
    type: actionTypes.CHAT_EMOTION_FAIL,
    error,
  };
}

export function getEmotionsReactMember(task_id, chat_id, emotion) {
  return {
    type: actionTypes.GET_EMOTIONS_REACT_MEMBER,
    task_id, chat_id, emotion,
  };
}

export function getEmotionsReactMemberSuccess(payload) {
  return {
    type: actionTypes.GET_EMOTIONS_REACT_MEMBER_SUCCESS,
    payload,
  };
}

export function getEmotionsReactMemberFail(error) {
  return {
    type: actionTypes.GET_EMOTIONS_REACT_MEMBER_FAIL,
    error,
  };
}
