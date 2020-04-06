import * as actions from "actions/chat/chat";
import { apiService } from "constants/axiosInstance";
import { call, put } from "redux-saga/effects";

export function* deleteChat(payload) {
  try {
    const { task_id, chat_id } = payload;
    const res = yield call(apiService.post, "/task/delete-chat", { task_id, chat_id });
    yield put(actions.deleteChatSuccess(res.data));
    yield put(actions.loadChat(task_id));
  } catch (error) {
    yield put(actions.deleteChatFail(error));
  }
}

export function* loadChat(payload) {
  try {
    const { task_id } = payload;
    const res = yield call(apiService.get, `/task/get-chat?task_id=${task_id}&page=1`, { task_id });
    yield put(actions.loadChatSuccess(res.data));
  } catch (error) {
    yield put(actions.loadChatFail(error));
  }
}

export function* chatImage(payload) {
  try {
    const { task_id, data, onUploading } = payload;
    const res = yield call(apiService.post,
      `/task/create-chat-image?task_id=${task_id}`,
      data,
      {
        onUploadProgress: progressEvent => {
          const percent = (progressEvent.loaded / progressEvent.total) * 100;
          onUploading(percent);
        }
      });
    yield put(actions.chatImageSuccess(res.data));
    yield put(actions.loadChat(task_id));
  } catch (error) {
    yield put(actions.chatImageFail(error));
  }
}
export function* chatFile(dispatch) {
  try {
    const { task_id, data, onUploading } = dispatch;
    const res = yield call(apiService.post,
      `/task/create-chat-file?task_id=${task_id}`,
      data,
      {
        onUploadProgress: progressEvent => {
          const percent = (progressEvent.loaded / progressEvent.total) * 100;
          onUploading(percent);
        }
      });
    yield put(actions.chatFileSuccess(res.data));
    yield put(actions.loadChat(task_id));
  } catch (error) {
    yield put(actions.chatFileFail(error));
  }
}
export function* chatForwardFile(payload) {
  try {
    const { task_id, file_ids } = payload;
    const res = yield call(apiService.post, `/task/create-chat-forward-file?task_id=${task_id}`, { file_ids });
    yield put(actions.chatForwardFileSuccess(res.data));
  } catch (error) {
    yield put(actions.chatForwardFileFail(error));
  }
}
export function* chatSticker(payload) {
  try {
    const { task_id, sticker_id } = payload;
    const res = yield call(apiService.post, `/task/create-chat-sticker?task_id=${task_id}`, { sticker_id });
    yield put(actions.chatStickerSuccess(res.data));
    yield put(actions.loadChat(task_id));
  } catch (error) {
    yield put(actions.chatStickerFail(error));
  }
}
export function* getChatNotViewed(payload) {
  try {
    const { task_id } = payload;
    const res = yield call(apiService.get, "/chat/get-numner-chat-not-viewed", { task_id });
    yield put(actions.getChatNotViewedSuccess(res.data));
  } catch (error) {
    yield put(actions.getChatNotViewedFail(error));
  }
}
export function* getNotiChat(payload) {
  try {
    const { task_id, not_viewed } = payload;
    const res = yield call(apiService.get, "/chat/notifications", { task_id, not_viewed });
    yield put(actions.getNotiChatSuccess(res.data));
  } catch (error) {
    yield put(actions.getNotiChatFail(error));
  }
}
export function* forwardChat(payload) {
  try {
    const { task_id, chat_id, forward_to } = payload;
    const res = yield call(apiService.post, "/task/forward-chat", { task_id, chat_id, forward_to });
    yield put(actions.forwardChatSuccess(res.data));
  } catch (error) {
    yield put(actions.forwardChatFail(error));
  }
}

export function* getListStickers(payload) {
  try {
    const { task_id, chat_id, forward_to } = payload;
    const res = yield call(apiService.get, "/stickers/get-list", { task_id, chat_id, forward_to });
    yield put(actions.getListStickersSuccess(res.data));
  } catch (error) {
    yield put(actions.getListStickersFail(error));
  }
}

export function* loadListTask(payload) {
  try {
    const { task_id, projectId } = payload;
    const res = yield call(apiService.get, `project/list-task-detail?project_id=${projectId}`);
    yield put(actions.loadListTaskSuccess(res.data));
  } catch (error) {
    yield put(actions.loadListTaskFail(error));
  }
}