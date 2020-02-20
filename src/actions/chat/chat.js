import { apiService } from '../../constants/axiosInstance';
import * as actionTypes from '../../constants/actions/chat/chat';

// action
export const getListChat = data => ({
  type: actionTypes.FETCH_LIST_CHAT,
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
  return apiService({ method: 'post', url: '/chat/create-chat-text', data });
};
export const createChatImg = data => {
  return apiService({ method: 'post', url: '/chat/create-chat-image', data });
};
export const createChatFile = data => {
  return apiService({ method: 'post', url: '/chat/create-chat-file', data });
};
