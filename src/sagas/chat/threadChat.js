import * as actions from "actions/chat/threadChat";
import { apiService } from "constants/axiosInstance";
import { call, put, select } from "redux-saga/effects";
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../constants/snackbarController';
import get from "lodash/get";
import {
  FETCH_LIST_MEMBER_NOT_CREATE_PRIVATE_CHAT_SUCCESS,
  CREATE_PRIVATE_CHAT_SUCCESS,
  CREATE_PRIVATE_CHAT_FAILD,
  GET_MEMBER_TO_CREATE_GROUP_CHAT_SUCCESS,
  CREATE_GROUP_CHAT_SUCCESS,
  CREATE_GROUP_CHAT_FAILD,
  VIEW_ALL_MESSAGE_SUCCESS,
  VIEW_ALL_MESSAGE_FAILD,
  GET_NUMBER_MESSAGE_NOT_VIEW_SUCCESS
} from '../../constants/actions/chat/threadChat';

async function doGetMembersNotCreateThreadChat() {
  try {
    const config = {
      url: '/thread-chat/get-member-to-create-private-chat',
      method: 'get',
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

export function* getMembersNotCreateThreadChat() {
  try {
    const { members } = yield call(doGetMembersNotCreateThreadChat);
    yield put({ type: FETCH_LIST_MEMBER_NOT_CREATE_PRIVATE_CHAT_SUCCESS, payload: members || [] });
  } catch (error) {
    yield put({ type: FETCH_LIST_MEMBER_NOT_CREATE_PRIVATE_CHAT_SUCCESS, payload: [] });
  }
}

async function doCreateThreadChat(data) {
  try {
    const config = {
      url: '/thread-chat/create-private',
      method: 'post',
      data
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

export function* createThreadChat(data) {
  try {
    const response = yield call(doCreateThreadChat, data.payload);
    yield put({ type: CREATE_PRIVATE_CHAT_SUCCESS, payload: response });
  } catch (error) {
  	SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
    yield put({ type: CREATE_PRIVATE_CHAT_FAILD });
  }
}

async function doGetMembersToCreateGroupChat() {
  try {
    const config = {
      url: '/thread-chat/get-member-to-create-group-chat',
      method: 'get',
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

export function* getMembersToCreateGroupChat() {
  try {
    const { members } = yield call(doGetMembersToCreateGroupChat);
    yield put({ type: GET_MEMBER_TO_CREATE_GROUP_CHAT_SUCCESS, payload: members || [] });
  } catch (error) {
    yield put({ type: GET_MEMBER_TO_CREATE_GROUP_CHAT_SUCCESS, payload: [] });
  }
}

async function doCreateGroupChat(data) {
  try {
    const config = {
      url: '/thread-chat/create-group-chat',
      method: 'post',
      data
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

export function* createGroupChat(data) {
  try {
    const response = yield call(doCreateGroupChat, data.payload);
    yield put({ type: CREATE_GROUP_CHAT_SUCCESS, payload: response });
  } catch (error) {
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
    yield put({ type: CREATE_GROUP_CHAT_FAILD });
  }
}

async function doViewAllChat(data) {
  try {
    const config = {
      url: '/chat/view-all-chat-person',
      method: 'post',
      data
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

export function* viewAllChatMessage(data) {
  try {
    const response = yield call(doViewAllChat, data.payload);
    yield put({ type: VIEW_ALL_MESSAGE_SUCCESS, payload: response });
  } catch (error) {
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
    yield put({ type: VIEW_ALL_MESSAGE_FAILD });
  }
}

async function doGetMesssageNotView() {
  try {
    const config = {
      url: '/chat/get-numner-chat-not-viewed-chat-person',
      method: 'get',
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

export function* getMessageNotView() {
  try {
    const { number_chat } = yield call(doGetMesssageNotView);
    yield put({ type: GET_NUMBER_MESSAGE_NOT_VIEW_SUCCESS, payload: number_chat || 0 });
  } catch (error) {
    yield put({ type: GET_NUMBER_MESSAGE_NOT_VIEW_SUCCESS, payload: 0 });
  }
}