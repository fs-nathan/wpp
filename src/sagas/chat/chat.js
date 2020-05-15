import * as actions from "actions/chat/chat";
import { apiService } from "constants/axiosInstance";
import { call, put, select } from "redux-saga/effects";

export function* deleteChat(payload) {
  try {
    const { task_id, chat_id } = payload;
    const res = yield call(apiService.post, "/task/delete-chat", { task_id, chat_id });
    yield put(actions.deleteChatSuccess(res.data));
    // yield put(actions.loadChat(task_id));
  } catch (error) {
    yield put(actions.deleteChatFail(error));
  }
}

export function* loadChat(payload) {
  try {
    const { task_id, last_id, isMore } = payload;
    const res = yield call(apiService.get, `/task/get-chat`, { params: { task_id, last_id } });
    yield put(actions.loadChatSuccess(res.data, isMore));
    yield put(actions.getViewedChat(task_id));
  } catch (error) {
    yield put(actions.loadChatFail(error));
  }
}

export function* chatImage(payload) {
  try {
    const { task_id, data, onUploading, id } = payload;
    const uuid = yield select(state => state.taskDetail.detailTask.taskDetails.uuid);
    data.append("uuid", uuid)
    const res = yield call(apiService.post,
      `/task/create-chat-image?task_id=${task_id}`,
      data,
      {
        onUploadProgress: progressEvent => {
          const percent = (progressEvent.loaded / progressEvent.total) * 100;
          onUploading(Math.round(percent));
        }
      });
    yield put(actions.chatImageSuccess(res.data));
    // yield put(actions.loadChat(task_id));
    yield put(actions.appendChat(res.data, id));
    // yield put(actions.removeChatById(id));
  } catch (error) {
    yield put(actions.chatImageFail(error));
  }
}
export function* chatFile(payload) {
  try {
    const { task_id, data, onUploading, id } = payload;
    const uuid = yield select(state => state.taskDetail.detailTask.taskDetails.uuid);
    data.append("uuid", uuid)
    const res = yield call(apiService.post,
      `/task/create-chat-file?task_id=${task_id}`,
      data,
      {
        onUploadProgress: progressEvent => {
          const percent = (progressEvent.loaded / progressEvent.total) * 100;
          onUploading(Math.round(percent));
        }
      });
    yield put(actions.chatFileSuccess(res.data));
    // yield put(actions.loadChat(task_id));
    yield put(actions.appendChat(res.data, id));
    // yield put(actions.removeChatById(id));
  } catch (error) {
    yield put(actions.chatFileFail(error));
  }
}
export function* chatForwardFile(payload) {
  try {
    const { task_id, file_ids } = payload;
    const res = yield call(apiService.post, `/task/create-chat-forward-file?task_id=${task_id}`, { file_ids });
    yield put(actions.chatForwardFileSuccess(res.data));
    // yield put(actions.loadChat(task_id));
    // yield put(actions.appendChat(res.data));
  } catch (error) {
    yield put(actions.chatForwardFileFail(error));
  }
}
export function* chatSticker(payload) {
  try {
    const { task_id, sticker_id } = payload;
    const res = yield call(apiService.post, `/task/create-chat-sticker?task_id=${task_id}`, { sticker_id });
    yield put(actions.chatStickerSuccess(res.data));
    // yield put(actions.appendChat(res.data));
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

export function* getEmotions(payload) {
  try {
    const { task_id } = payload;
    const res = yield call(apiService.get, "/emotions/get-list", { task_id });
    yield put(actions.getEmotionsSuccess(res.data));
  } catch (error) {
    yield put(actions.getEmotionsFail(error));
  }
}
export function* chatEmotion(payload) {
  try {
    const { task_id, chat_id, emotion } = payload;
    const res = yield call(apiService.post, "/task/chat-create-emotion", { task_id, chat_id, emotion });
    yield put(actions.chatEmotionSuccess(res.data));
    // yield put(actions.loadChat(task_id));
  } catch (error) {
    yield put(actions.chatEmotionFail(error));
  }
}
export function* getEmotionsReactMember(payload) {
  try {
    const { task_id, chat_id, emotion } = payload;
    const res = yield call(apiService.get, "/task/get-member-react-emotion-one-chat", { params: { task_id, chat_id, emotion } });
    yield put(actions.getEmotionsReactMemberSuccess(res.data));
  } catch (error) {
    yield put(actions.getEmotionsReactMemberFail(error));
  }
}

export function* createChatText(payload) {
  try {
    const { content: { parent_id, content, tags, urls, task_id }, resendId } = payload;
    const uuid = yield select(state => state.taskDetail.detailTask.taskDetails.uuid);
    const res = yield call(apiService.post, "/task/create-chat-text", {
      parent_id, content, tags, urls, task_id, uuid
    });
    yield put(actions.createChatTextSuccess(res.data));
    // yield put(actions.loadChat(content.task_id));
    yield put(actions.appendChat(res.data, resendId));
    // yield put(actions.removeChatById(resendId));
  } catch (error) {
    console.log('uuid', error)
    yield put(actions.createChatTextFail(error, payload.content.id));
  }
}

export function* getViewedChat(payload) {
  try {
    const { task_id } = payload;
    const res = yield call(apiService.get, "/task/get-member-viewed-chat", { params: { task_id } });
    yield put(actions.getViewedChatSuccess(res.data));
  } catch (error) {
    yield put(actions.getViewedChatFail(error));
  }
}

export function* getRemindDetail(payload) {
  try {
    const { task_id, remind_id } = payload;
    const res = yield call(apiService.get, "/task/get-remind-detail", { params: { task_id, remind_id } });
    yield put(actions.getRemindDetailSuccess(res.data));
    yield put(actions.openDetailRemind(true, res.data.remind));
  } catch (error) {
    yield put(actions.getRemindDetailFail(error));
  }
}

export function* getSubtaskDetail(payload) {
  try {
    const { task_id, sub_task_id } = payload;
    const res = yield call(apiService.get, "/task/get-subtask-detail", { params: { task_id, sub_task_id } });
    yield put(actions.getSubtaskDetailSuccess(res.data));
    yield put(actions.openDetailSubTask(true, res.data.sub_task));
  } catch (error) {
    yield put(actions.getSubtaskDetailFail(error));
  }
}

export function* getOfferDetail(payload) {
  try {
    const { task_id, offer_id } = payload;
    const res = yield call(apiService.post, "/task/get-offer-detail", { task_id, offer_id });
    yield put(actions.getOfferDetailSuccess(res.data));
  } catch (error) {
    yield put(actions.getOfferDetailFail(error));
  }
}

export function* getDemandDetail(payload) {
  try {
    const { task_id, demand_id } = payload;
    const res = yield call(apiService.post, "/task/get-command-decision-detail", { task_id, demand_id });
    yield put(actions.getDemandDetailSuccess(res.data));
  } catch (error) {
    yield put(actions.getDemandDetailFail(error));
  }
}

export function* chatQuickLike(payload) {
  try {
    const { task_id } = payload;
    const res = yield call(apiService.post, "/task/chat-quick-like", { task_id });
    yield put(actions.chatQuickLikeSuccess(res.data));
    // yield put(actions.appendChat(res.data));
  } catch (error) {
    yield put(actions.chatQuickLikeFail(error));
  }
}

export function* createChatFileFromGoogleDriver(payload) {
  try {
    const { task_id, google_data } = payload;
    const res = yield call(apiService.post, "/task/create-chat-file-from-google-driver", { task_id, google_data });
    yield put(actions.createChatFileFromGoogleDriverSuccess(res.data));
    // yield put(actions.appendChat(res.data));
  } catch (error) {
    yield put(actions.createChatFileFromGoogleDriverFail(error));
  }
}

export function* getGirdListTask(payload) {
  try {
    const res = yield call(apiService.get, "/get-gird-list-task");
    yield put(actions.getGirdListTaskSuccess(res.data));
  } catch (error) {
    yield put(actions.getGirdListTaskFail(error));
  }
}

export function* getDataPinOnTaskChat(payload) {
  try {
    const { task_id } = payload;
    const res = yield call(apiService.get, "/task/get-data-pin-on-task-chat", { params: { task_id } });
    yield put(actions.getDataPinOnTaskChatSuccess(res.data));
  } catch (error) {
    yield put(actions.getDataPinOnTaskChatFail(error));
  }
}
