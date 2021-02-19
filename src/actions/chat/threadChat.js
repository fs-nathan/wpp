import * as actionTypes from '../../constants/actions/chat/threadChat';
import { apiService } from '../../constants/axiosInstance';

// action
export const getMembersNotCreatePrivateChat = data => ({
  type: actionTypes.FETCH_LIST_MEMBER_NOT_CREATE_PRIVATE_CHAT,
  payload: data
});

export const createPrivateChat = data => ({
  type: actionTypes.CREATE_PRIVATE_CHAT,
  payload: data
});

export const getMembersToCreateGroupChat = data => ({
  type: actionTypes.GET_MEMBER_TO_CREATE_GROUP_CHAT,
  payload: data
});

export const createGroupChat = data => ({
  type: actionTypes.CREATE_GROUP_CHAT,
  payload: data
});

export const viewAllMessage = data => ({
  type: actionTypes.VIEW_ALL_MESSAGE,
  payload: data
});

export const getNumberMessageNotView = data => ({
  type: actionTypes.GET_NUMBER_MESSAGE_NOT_VIEW,
  payload: data
});

export const setNumberMessageNotView = data => ({
  type: actionTypes.SET_NUMBER_MESSAGE_NOT_VIEW,
  payload: data
});
