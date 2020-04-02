import * as actions from "actions/chat/chat";
import { apiService } from "constants/axiosInstance";
import { call, put } from "redux-saga/effects";

export function* deleteChat({ payload }) {
  try {
    const { task_id, chat_id } = payload;
    const res = yield call(apiService.post, "/task/delete-chat", { task_id, chat_id });
    yield put(actions.deleteChatSuccess(res.data));
  } catch (error) {
    yield put(actions.deleteChatFail(error));
  }
}