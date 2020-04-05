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
export const getListChatService = task_id => {
  return apiService({
    method: 'get',
    url: '/task/get-chat',
    params: { task_id }
  });
};
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

export function loadChat(taskId) {
  return {
    type: actionTypes.LOAD_CHAT,
    task_id: taskId,
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


export function chatImage(task_id, data) {
  return {
    type: actionTypes.CHAT_IMAGE,
    task_id, data,
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

export function chatFile(task_id, data) {
  return {
    type: actionTypes.CHAT_FILE,
    task_id,
    data,
  };
}

export function chatFileSuccess(payload) {
  return {
    type: actionTypes.CHAT_FILE_SUCCESS,
    payload,
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
