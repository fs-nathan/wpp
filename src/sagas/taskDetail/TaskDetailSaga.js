import { get } from 'lodash';
import { call, put, select } from "redux-saga/effects";
import { lastJobSettingKey } from "views/JobDetailPage/ListPart/ListHeader/CreateJobSetting";
import * as actions from "../../actions/taskDetail/taskDetailActions";
import { apiService } from "../../constants/axiosInstance";
import { CREATE_TASK, DELETE_TASK, CustomEventEmitter } from '../../constants/events';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../constants/snackbarController';
import { CREATE_OFFER } from 'views/OfferPage/redux/types';
import { getDataPinOnTaskChat } from 'actions/chat/chat';
import * as types from '../../constants/actions/taskDetail/taskDetailConst';

// Priority
async function doUpdatePriority(payload) {
  try {
    const config = {
      url: "/task/update-priority",
      method: "put",
      data: payload
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* updatePriority(action) {
  try {
    const res = yield call(doUpdatePriority, action.payload);
    yield put(actions.updatePrioritySuccess(res));
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(actions.updatePriorityFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

// Sub-task::
async function doGetSubTask({ taskId }) {
  try {
    const config = {
      url: "task/get-subtask?task_id=" + taskId,
      method: "get"
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* getSubTask(action) {
  try {
    const res = yield call(doGetSubTask, action.options);
    yield put(actions.getSubTaskSuccess(res));
  } catch (error) {
    yield put(actions.getSubTaskFail(error));
  }
}
//====== post
async function doPostSubTask(payload) {
  try {
    const config = {
      url: "task/create-subtask",
      method: "post",
      data: payload
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* postSubTask(action) {
  try {
    const res = yield call(doPostSubTask, action.options);
    yield put(actions.postSubTaskSuccess(res));
    yield put(actions.getSubTask({ taskId: action.options.task_id }));
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(actions.postSubTaskFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}
//=== update
async function doUpdateSubTask(payload) {
  try {
    const config = {
      url: `task/update-subtask?sub_task_id=${payload.sub_task_id}&name=${payload.name}`,
      method: "post",
      data: payload
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* updateSubTask(action) {
  const data = {
    task_id: action.options.taskId,
    sub_task_id: action.options.sub_task_id,
    name: action.options.name
  };
  try {
    const res = yield call(doUpdateSubTask, data);
    yield put(actions.updateSubTaskSuccess(res));
    yield put(actions.getSubTask(action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(actions.updateSubTaskFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}
// ==== delete
async function doDeleteSubTask({ sub_task_id, taskId }) {
  try {
    const config = {
      url: "task/delete-subtask?sub_task_id=" + sub_task_id,
      method: "post",
      data: { sub_task_id, task_id: taskId }
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* deleteSubTask(action) {
  try {
    const res = yield call(doDeleteSubTask, action.options);
    yield put(actions.deleteSubTaskSuccess(res));
    yield put(actions.getSubTask(action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(actions.deleteSubTaskFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}
// ===== complete sub task
async function doCompleteSubTask(payload) {
  try {
    const config = {
      url: "task/complete-subtask",
      method: "post",
      data: payload
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* completeSubTask(action) {
  try {
    const { taskId, sub_task_id } = action.options;
    const res = yield call(doCompleteSubTask, { sub_task_id, task_id: taskId });
    yield put(actions.completeSubTaskSuccess(res));
    yield put(actions.getSubTask({ taskId }));
    // yield put(appendChat(res));
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(actions.completeSubTaskFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

// Remind::::::::::::::::::::::::::::::::::::::::::::::::
async function doGetRemind({ taskId }) {
  try {
    const config = {
      url: "task/get-remind?task_id=" + taskId,
      method: "get"
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* getRemind(action) {
  try {
    const res = yield call(doGetRemind, action.options);
    yield put(actions.getRemindSuccess(res));
  } catch (error) {
    yield put(actions.getRemindFail(error));
  }
}
//====== post with time detail
async function doPostRemindWithTimeDetail(payload) {
  const payloadRemind = {
    content: payload.data.content,
    date_remind: payload.data.date_remind + " " + payload.data.time_remind,
    type_remind: payload.data.type_remind,
    task_id: payload.taskId,
    frequency: payload.data.frequency
  };

  try {
    const config = {
      url: "task/create-remind/time-detail",
      method: "post",
      data: payloadRemind
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* postRemindWithTimeDetail(action) {
  try {
    const res = yield call(doPostRemindWithTimeDetail, action.options);
    yield put(actions.getRemind({ taskId: action.options.taskId }));
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(actions.postRemindWithTimeDetailFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}
// ==== post duration
async function doPostRemindDuration(payload) {
  try {
    const config = {
      url: "task/create-remind/duration",
      method: "post",
      data: payload
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* postRemindDuration(action) {
  try {
    const res = yield call(doPostRemindDuration, action.options);
    yield put(actions.postRemindDurationSuccess(res));
    yield put(actions.getRemind({ taskId: action.options.task_id }));
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(actions.postRemindDurationFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}
// //=== update with time detail
async function doUpdateRemindWithTimeDetail(payload) {
  try {
    const config = {
      url: `task/update-remind/time-detail`,
      method: "post",
      data: payload
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* updateRemindWithTimeDetail(action) {
  try {
    const res = yield call(doUpdateRemindWithTimeDetail, action.options.data);
    yield put(actions.updateRemindWithTimeDetailSuccess(res));
    yield put(actions.getRemind({ taskId: action.options.taskId }));
    const pinnedRemind = yield select(state => state.chat.pinnedRemind)
    if (pinnedRemind.id === action.options.data.remind_id) {
      yield put(getDataPinOnTaskChat(action.options.taskId));
    }
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
    // yield put(appendChat(res));
  } catch (error) {
    yield put(actions.updateRemindWithTimeDetailFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}
// //=== update with duration
async function doUpdateRemindWithDuration(payload) {
  try {
    const config = {
      url: `task/update-remind/duration`,
      method: "post",
      data: payload
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* updateRemindWithDuration(action) {
  try {
    const res = yield call(doUpdateRemindWithDuration, action.options.data);
    yield put(actions.updateRemindWithDurationSuccess(res));
    yield put(actions.getRemind({ taskId: action.options.taskId }));
    const pinnedRemind = yield select(state => state.chat.pinnedRemind)
    if (pinnedRemind.id === action.options.data.remind_id) {
      yield put(getDataPinOnTaskChat(action.options.taskId));
    }
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
    // yield put(appendChat(res));
  } catch (error) {
    yield put(actions.updateRemindWithDurationFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}
// ==== delete
async function doDeleteRemind(payload) {
  try {
    const config = {
      url: "task/delete-remind",
      method: "post",
      data: payload
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* deleteRemind(action) {
  try {
    const { remind_id, taskId } = action.payload;
    const res = yield call(doDeleteRemind, { remind_id, task_id: taskId });
    yield put(actions.deleteRemindSuccess(res));
    yield put(actions.getRemind({ taskId }));
    const pinnedRemind = yield select(state => state.chat.pinnedRemind)
    if (pinnedRemind.id === remind_id) {
      yield put(getDataPinOnTaskChat(taskId));
    }
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(actions.deleteRemindFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

function* pinRemind(action) {
  try {
    const { remind_id, taskId } = action.payload;
    const res = yield call(apiService.post, "/task/pin-remind", {
      remind_id,
      task_id: taskId
    });
    yield put(actions.pinRemindSuccess(res.data));
    yield put(actions.getRemind({ taskId }));
    yield put(getDataPinOnTaskChat(taskId));
    // yield put(appendChat(res.data));
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(actions.pinRemindFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

function* unpinRemind(action) {
  try {
    const { remind_id, taskId } = action.payload;
    const res = yield call(apiService.post, "/task/remove-pin-remind", {
      remind_id,
      task_id: taskId
    });
    yield put(actions.unPinRemindSuccess(res.data));
    yield put(actions.getRemind({ taskId }));
    yield put(getDataPinOnTaskChat(taskId));
    // yield put(appendChat(res.data));
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(actions.unPinRemindFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

//Offer::
async function doGetOffer({ taskId }) {
  try {
    const config = {
      url: "/offers/get-offer-task?task_id=" + taskId,
      method: "get"
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* getOffer(action) {
  try {
    const res = yield call(doGetOffer, action.options);
    yield put(actions.getOfferSuccess(res));
  } catch (error) {
    yield put(actions.getOfferFail(error));
  }
}

function* createOffer(action) {
  try {
    const task_id = action.payload.data.get('task_id');
    const url = `/offers/create`;
    const res = yield call(apiService.post, url, action.payload.data, {
      headers: { 'Content-Type': 'multipart/form-data' },
      params: { task_id },
    });
    yield put(actions.createOfferSuccess(res.data));
    yield put(actions.getOffer({ taskId: task_id }));
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(actions.createOfferFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  } finally {
    CustomEventEmitter(CREATE_OFFER);
  }
}

async function doUpdateOffer(payload) {
  try {
    const config = {
      url: "/task/update-offer",
      method: "post",
      data: payload
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* updateOffer(action) {
  try {
    yield call(doUpdateOffer, action.payload);
    yield put(actions.getOffer({ taskId: action.payload.task_id }));
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(actions.updateOfferFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

async function doDeleteOffer(payload) {
  try {
    const config = {
      url: "/task/delete-offer",
      method: "post",
      data: payload
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* deleteOffer(action) {
  try {
    const { offer_id, taskId } = action.payload
    const res = yield call(doDeleteOffer, { offer_id, task_id: taskId })
    yield put(actions.deleteOfferSuccess(res))
    yield put(actions.getOffer({ taskId }))
    // yield put(appendChat(res));
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(actions.deleteOfferFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

function* approveOffer(action) {
  try {
    const res = yield call(apiService.post, 'task/approve-offer', action.payload)
    yield put(actions.approveOfferSuccess(res))
    yield put(actions.getOffer({ taskId: action.payload.task_id }));
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(actions.approveOfferFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

async function doUploadDocumentToOffer(payload) {
  try {
    const config = {
      url: "task/upload-document-to-offer",
      method: "post",
      data: payload
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* uploadDocumentToOffer(action) {
  try {
    const res = yield call(doUploadDocumentToOffer, action.payload.data);
    action.payload.successCallBack(res.documents);
    yield put(actions.uploadDocumentToOfferSuccess(res));
    yield put(actions.getOffer(action.payload.taskId));
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(actions.uploadDocumentToOfferFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

async function doDeleteDocumentToOffer(payload) {
  try {
    const config = {
      url: "task/delete-document-from-offer",
      method: "post",
      data: payload
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* deleteDocumentToOffer(action) {
  try {
    const res = yield call(doDeleteDocumentToOffer, action.payload.data);
    action.payload.removeCallBack(res);
    yield put(actions.deleteDocumentToOfferSuccess(res));
    yield put(actions.getOffer(action.payload.taskId));
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(actions.deleteDocumentToOfferFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

async function doHandleOffer(data) {
  try {
    const config = {
      url: "task/hander-offer",
      method: "post",
      data
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* handleOffer(action) {
  try {
    const res = yield call(doHandleOffer, action.payload.data);
    yield put(actions.handleOfferSuccess(res));
    yield put(actions.getOffer({ taskId: action.payload.taskId }));
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(actions.handleOfferFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

// Media Image
async function doGetImage({ taskId, page }) {
  try {
    const config = {
      url: "/task/get-image",
      method: "get",
      params: { task_id: taskId, page }
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* getImage(action) {
  try {
    const res = yield call(doGetImage, action.options);
    yield put(actions.getImageSuccess(res, action.options.page));
  } catch (error) {
    yield put(actions.getImageFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

// Media File
async function doGetFile({ taskId, page }) {
  try {
    const config = {
      url: "/task/get-file",
      method: "get",
      params: { task_id: taskId, page }
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* getFile(action) {
  try {
    const res = yield call(doGetFile, action.options);
    yield put(actions.getFileTabPartSuccess(res, action.options.page));
  } catch (error) {
    yield put(actions.getFileTabPartFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}
// Media Link
async function doGetLink({ taskId }) {
  try {
    const config = {
      url: "/task/get-link?task_id=" + taskId,
      method: "get"
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* getLink(action) {
  try {
    const res = yield call(doGetLink, action.options);
    yield put(actions.getLinkTabPartSuccess(res));
  } catch (error) {
    yield put(actions.getLinkTabPartFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}
// Location
async function doGetLocation({ taskId }) {
  try {
    const config = {
      url: "/task/get-location?task_id=" + taskId,
      method: "get"
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* getLocation(action) {
  try {
    const res = yield call(doGetLocation, action.options);
    yield put(actions.getLocationTabPartSuccess(res));
  } catch (error) {
    yield put(actions.getLocationTabPartFail(error));
  }
}

// Task Detail - TabPart - Cot phai
async function doGetTaskDetail({ taskId }) {
  try {
    const config = {
      url: "/task/detail?task_id=" + taskId,
      method: "get"
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* getTaskDetail(action) {
  try {
    const res = yield call(doGetTaskDetail, action.options);
    yield put(actions.getTaskDetailTabPartSuccess(res));
  } catch (error) {
    yield put(actions.getTaskDetailTabPartFail(error.message));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

//Command
async function doGetCommand({ task_id }) {
  try {
    const config = {
      url: "task/get-command-decision?task_id=" + task_id,
      method: "get"
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* getCommand(action) {
  try {
    const res = yield call(doGetCommand, action.options);
    yield put(actions.getCommandSuccess(res));
  } catch (error) {
    yield put(actions.getCommandFail(error));
  }
}

async function doCreateCommand(payload) {
  try {
    const config = {
      url: "task/create-command-decision",
      method: "post",
      data: payload
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* createCommand(action) {
  try {
    const res = yield call(doCreateCommand, action.payload);
    yield put(actions.createCommandSuccess(res));
    yield put(actions.getCommand({ task_id: action.payload.task_id }));
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(actions.createCommandFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

async function doUpdateCommand(payload) {
  try {
    const config = {
      url: "task/update-command-decision",
      method: "post",
      data: payload
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* updateCommand(action) {
  const data = {
    task_id: action.payload.taskId,
    command_id: action.payload.id,
    content: action.payload.content,
    type: action.payload.type
  };
  try {
    const res = yield call(doUpdateCommand, data);
    yield put(actions.updateCommandSuccess(res));
    yield put(actions.getCommand({ task_id: action.payload.taskId }));
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(actions.updateCommandFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

async function doDeleteCommand(payload) {
  try {
    const config = {
      url: "task/delete-command-decision",
      method: "post",
      data: payload
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* deleteCommand(action) {
  try {
    const res = yield call(doDeleteCommand, {
      task_id: action.payload.task_id,
      command_id: action.payload.command_id
    });
    yield put(actions.deleteCommandSuccess(res));
    yield put(actions.getCommand({ task_id: action.payload.task_id }));
    // yield put(appendChat({ data_chat: res.data }));
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(actions.deleteCommandFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

// Member
async function doGetMember({ task_id }) {
  try {
    const config = {
      url: "task/get-member?task_id=" + task_id,
      method: "get"
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}
function* getMember(action) {
  try {
    const res = yield call(doGetMember, action.payload);
    yield put(actions.getMemberSuccess(res));
  } catch (error) {
    yield put(actions.getMemberFail(error));
  }
}

async function doGetMemberNotAssigned({ task_id }) {
  try {
    const config = {
      url: "task/get-member-not-assigned?task_id=" + task_id,
      method: "get"
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* getMemberNotAssigned(action) {
  try {
    const res = yield call(doGetMemberNotAssigned, action.payload);
    yield put(actions.getMemberNotAssignedSuccess(res));
  } catch (error) {
    yield put(actions.getMemberNotAssignedFail(error));
  }
}

async function doCreateMember(payload) {
  try {
    const config = {
      url: "task/add-member",
      method: "post",
      data: payload
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* createMember(action) {
  try {
    const res = yield call(doCreateMember, action.payload)
    const from = get(action.payload,"from", null);
    if(from !== null && from === "TaskByMember") {
      CustomEventEmitter(types.EVENT_ADD_MEMBER_TO_TASK_SUCCESS);
    } else {
      yield put(actions.getMember({ task_id: action.payload.task_id }))
      yield put(actions.getMemberNotAssigned({ task_id: action.payload.task_id }))
      yield put(actions.createMemberSuccess(res))
    }

    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(actions.createMemberFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

async function doDeleteMember(payload) {
  try {
    const config = {
      url: "task/remove-member",
      method: "post",
      data: payload
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* deleteMember(action) {
  try {
    const res = yield call(doDeleteMember, action.payload)
    const from = get(action.payload,"from", null);
    if(from !== null && from === "TaskByMember") {
      CustomEventEmitter(types.EVENT_REMOVE_MEMBER_FROM_TASK_SUCCESS);
    } else {
      yield put(actions.getMember({ task_id: action.payload.task_id }))
      yield put(actions.getMemberNotAssigned({ task_id: action.payload.task_id }))
      yield put(actions.deleteMemberSuccess(res))
    }
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(actions.deleteMemberFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

// Member Permission
async function doGetPermission(payload) {
  try {
    const config = {
      url: '/permissions/list-group-permission?module=3',
      method: 'get',
      data: payload
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* getPermission(action) {
  try {
    const res = yield call(doGetPermission, action.payload);
    yield put(actions.getPermissionSuccess(res));
  } catch (error) {
    yield put(actions.getPermissionFail(error));
  }
}

async function doUpdatePermission(payload) {
  try {
    const config = {
      url: 'task/update-group-permission-for-member',
      method: 'post',
      data: payload
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* updatePermission(action) {
  try {
    const res = yield call(doUpdatePermission, action.payload)
    yield put(actions.updatePermissionSuccess(res))
    yield put(actions.getMember({ task_id: action.payload.task_id }))
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(actions.updatePermissionFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

// Member Role
async function doGetRole(payload) {
  try {
    const config = {
      url: "/list-user-role",
      method: "get",
      data: payload
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* getRole(action) {
  try {
    const res = yield call(doGetRole, action.payload);
    yield put(actions.getRoleSuccess(res));
  } catch (error) {
    yield put(actions.getRoleFail(error));
  }
}

async function doCreateRole(payload) {
  try {
    const config = {
      url: "/create-user-role",
      method: "post",
      data: payload
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* createRole(action) {
  try {
    const res = yield call(doCreateRole, action.payload);
    yield put(actions.createRoleSuccess(res));
    yield put(actions.getRole());
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(actions.createRoleFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

async function doUpdateRole(payload) {
  try {
    const config = {
      url: "/update-user-role",
      method: "put",
      data: payload
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* updateRole(action) {
  try {
    const res = yield call(doUpdateRole, action.payload);
    yield put(actions.updateRoleSuccess(res));
    yield put(actions.getRole());
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(actions.updateRoleFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

async function doDeleteRole(payload) {
  try {
    const config = {
      url: "/delete-user-role",
      method: "delete",
      data: payload
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* deleteRole(action) {
  try {
    const res = yield call(doDeleteRole, action.payload);
    yield put(actions.deleteRoleSuccess(res));
    yield put(actions.getRole());
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(actions.deleteRoleFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

function* updateRolesForMember(action) {
  try {
    const res = yield call(apiService.post, 'task/update-role-of-member', action.payload)
    yield put(actions.updateRolesForMemberSuccess(res.data))
    yield put(actions.getMember({ task_id: action.payload.task_id }));
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(actions.updateRolesForMemberFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}
// Get list task detail
async function doGetListTaskDetail({ project_id, type_data }) {
  try {
    const config = {
      url: "project/list-task-detail",
      params: { project_id, type_data },
      method: "get"
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* getListTaskDetail(action) {
  try {
    if (!action.type_data) {
      const userId = yield select(state => state.system.profile.id);
      const key = `${userId}:${lastJobSettingKey}`;
      action.type_data = localStorage.getItem(key) || 'include-room';
    }
    const res = yield call(doGetListTaskDetail, action)
    yield put(actions.getListTaskDetailSuccess(res, action.type_data))
  } catch (error) {
    yield put(actions.getListTaskDetailFail(error));
  }
}
//time
async function doGetTrackingTime(taskId) {
  try {
    const config = {
      url: "task/get-tracking-time?task_id=" + taskId,
      method: "get"
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}
function* getTrackingTime(action) {
  try {
    const res = yield call(doGetTrackingTime, action.payload);

    yield put(actions.getTrackingTimeSuccess(res));
  } catch (error) {
    yield put(actions.getTrackingTimeFail(error));
  }
}

function* getTrackingTimeComplete(action) {
  try {
    const url = `task/get-tracking-complete?task_id=${action.payload}`
    const res = yield call(apiService.get, url);
    yield put(actions.getTrackingTimeCompleteSuccess(res.data));
  } catch (error) {
    yield put(actions.getTrackingTimeCompleteFail(error));
  }
}

async function doUpdateTimeDuration(payload) {
  try {
    const config = {
      url: "task/update-time-duration",
      method: "put",
      data: payload
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}
function* updateTimeDuration(action) {
  try {
    const res = yield call(doUpdateTimeDuration, action.payload);
    yield put(actions.updateTimeDurationSuccess(res));
    yield put(actions.getTaskDetailTabPart({ taskId: action.payload.task_id }));
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(actions.updateTimeDurationFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

async function doCreateTask(payload) {
  try {
    const config = {
      url: "task/create",
      method: "post",
      data: payload
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* createTask(action) {
  try {
    const res = yield call(doCreateTask, action.payload.data);
    yield put(actions.createTaskSuccess(res));
    yield put(
      actions.getListTaskDetail(action.payload.projectId)
    );
    CustomEventEmitter(CREATE_TASK);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(actions.createTaskFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

// Get list ground task
async function doGetListGroupTask({ project_id }) {
  try {
    const config = {
      url: "group-task/list?project_id=" + project_id,
      method: "get"
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* getListGroupTask(action) {
  try {
    const res = yield call(doGetListGroupTask, action.payload);
    yield put(actions.getListGroupTaskSuccess(res));
  } catch (error) {
    yield put(actions.getListGroupTaskFail(error));
  }
}

function* getListOffer(action) {
  try {
    const res = yield call(apiService.get, "/offers/list-group-offer");
    yield put(actions.getListOfferSuccess(res.data));
  } catch (error) {
    yield put(actions.getListOfferFail(error));
  }
}

async function doGetProjectListBasic() {
  try {
    const config = {
      url: "project/list-basic",
      method: "get"
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* getProjectListBasic(action) {
  try {
    const response = yield call(doGetProjectListBasic);
    let projectGroups = response.projects;
    const projectId = action.payload || "";
    yield put(actions.getProjectListBasicSuccess({ projectGroups, projectId }));
  } catch (error) {
    yield put(actions.getProjectListBasicFail(error));
  }
}

// update name and description
async function doUpdateNameDescriptionTask(payload) {
  try {
    const config = {
      url: "/task/update",
      method: "post",
      data: payload
    };
    const result = await apiService(config);
    return result.data;
    // return null;
  } catch (error) {
    throw error;
  }
}

function* updateNameDescriptionTask(action) {
  try {
    const res = yield call(doUpdateNameDescriptionTask, action.payload);
    const taskId = action.payload.task_id;
    yield put(actions.updateNameDescriptionTaskSuccess(res));
    yield put(actions.getTaskDetailTabPart({ taskId }));
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(actions.updateNameDescriptionTaskFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

// Get Project Detail
async function doGetProjectDetail(project_id) {
  try {
    const config = {
      url: "project/detail?project_id=" + project_id,
      method: "get"
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}
function* getProjectDetail(action) {
  try {
    const res = yield call(doGetProjectDetail, action.payload);

    yield put(actions.getProjectDetailSuccess(res));
  } catch (error) {
    yield put(actions.getProjectDetailFail(error));
  }
}
//updateComplete
async function doUpdateComplete(payload) {
  try {
    const config = {
      url: "task/update-complete",
      method: "put",
      data: payload
    };
    const result = await apiService(config);
    return result.data;
    // return null;
  } catch (error) {
    throw error;
  }
}
function* updateComplete(action) {
  try {
    const res = yield call(doUpdateComplete, action.payload.data);
    yield put(actions.updateCompleteSuccess(res));
    yield put(actions.getTrackingTimeComplete(action.payload.data.task_id));
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(actions.updateCommandFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

// static task
async function doGetStaticTask(project_id) {
  try {
    const config = {
      url: "/task/static?project_id=" + project_id,
      method: "get"
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}
function* getStaticTask(action) {
  try {
    const res = yield call(doGetStaticTask, action.payload);
    yield put(actions.getStaticTaskSuccess(res));
  } catch (error) {
    yield put(actions.getStaticTaskFail(error));
  }
}
// delete task
async function doDeleteTask(task_id) {
  try {
    const config = {
      url: "/task/delete?task_id=" + task_id,
      method: "delete",
      data: { task_id }
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}
function* deleteTask(action) {
  try {
    const res = yield call(doDeleteTask, action.payload.taskId);
    yield put(actions.deleteTaskSuccess(res));
    yield put(actions.getListTaskDetail(action.payload.projectId));
    CustomEventEmitter(DELETE_TASK);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(actions.deleteTaskFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export function* pinTask({ payload }) {
  try {
    const { task_id, projectId } = payload;
    const res = yield call(apiService.post, "/task/ghim-task", { task_id });
    yield put(actions.pinTaskSuccess(res.data, task_id));
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(actions.pinTaskFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export function* unPinTask({ payload }) {
  try {
    const { task_id, projectId } = payload;
    const res = yield call(apiService.post, "/task/cancel-ghim-task", {
      task_id
    });
    yield put(actions.unPinTaskSuccess(res.data, task_id));
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(actions.unPinTaskFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export function* stopTask(payload) {
  try {
    const { task_id } = payload;
    const res = yield call(apiService.post, "/task/stop-task", { task_id });
    yield put(actions.stopTaskSuccess(res.data, task_id));
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(actions.stopTaskFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export function* cancelStopTask(payload) {
  try {
    const { task_id } = payload;
    const res = yield call(apiService.post, "/task/cancel-stop-task", { task_id });
    yield put(actions.cancelStopTaskSuccess(res.data, task_id));
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(actions.cancelStopTaskFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export function* deleteShareLocation(payload) {
  try {
    const { task_id, location_share_id } = payload;
    const res = yield call(apiService.post, "/task/delete-share-location", { task_id, location_share_id });
    yield put(actions.deleteShareLocationSuccess(res.data));
    // yield put(appendChat(res.data));
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(actions.deleteShareLocationFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export function* updateNameDescription(payload) {
  try {
    const { task_id, name, description } = payload;
    const res = yield call(apiService.put, "/task/update-name-description", { task_id, name, description });
    yield put(actions.updateNameDescriptionSuccess(res.data, task_id));
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(actions.updateNameDescriptionFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export function* updateGroupTask(payload) {
  try {
    const { task_id, group_task } = payload;
    const res = yield call(apiService.put, "/task/update-group-task", { task_id, group_task });
    yield put(actions.updateGroupTaskSuccess({ data: res.data, task_id, group_task }));
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(actions.updateGroupTaskFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export function* updateTypeAssign(payload) {
  try {
    const { task_id, type_assign } = payload;
    const res = yield call(apiService.put, "/task/update-type-assign", { task_id, type_assign });
    yield put(actions.updateTypeAssignSuccess(res.data));
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(actions.updateTypeAssignFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export function* updateScheduleTask(payload) {
  try {
    const { task_id, schedule_id } = payload;
    const res = yield call(apiService.put, "/task/update-schedule-task", { task_id, schedule_id });
    yield put(actions.updateScheduleTaskSuccess(res.data));
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(actions.updateScheduleTaskFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export function* getSchedules(payload) {
  try {
    const { project_id } = payload;
    const res = yield call(apiService.get, "/project/get-schedules", { params: { project_id } });
    yield put(actions.getSchedulesSuccess(res.data));
  } catch (error) {
    yield put(actions.getSchedulesFail(error));
  }
}

export function* removeGroupPermissionOfMember(payload) {
  try {
    const { task_id, member_id } = payload;
    const res = yield call(apiService.post, "/task/remove-group-permission-of-member", { task_id, member_id });
    yield put(actions.removeGroupPermissionOfMemberSuccess(res.data));
    yield put(actions.getMember({ task_id }))
  } catch (error) {
    yield put(actions.removeGroupPermissionOfMemberFail(error));
  }
}

export function* detailGroupPermissionDefault(payload) {
  try {
    const res = yield call(apiService.get, "/permissions/detail-group-permission-default?group_permission_id=3", { payload });
    yield put(actions.detailGroupPermissionDefaultSuccess(res.data));
  } catch (error) {
    yield put(actions.detailGroupPermissionDefaultFail(error));
  }
}

export {
  updateComplete,
  // Update Priority
  updatePriority,
  // Offer::
  getOffer, createOffer, deleteOffer, approveOffer, updateOffer, uploadDocumentToOffer, deleteDocumentToOffer, handleOffer, getListOffer,
  // Remind::
  getRemind, postRemindWithTimeDetail, postRemindDuration, updateRemindWithTimeDetail, updateRemindWithDuration, deleteRemind, pinRemind, unpinRemind,
  // Sub-Task::
  getSubTask, postSubTask, updateSubTask, deleteSubTask, completeSubTask,
  // Media Image File
  getImage, getFile, getLink,
  // Location
  getLocation,
  // Task Detail - TabPart- Cot phai
  getTaskDetail,
  // Command and Decision::
  getCommand, createCommand, updateCommand, deleteCommand,
  // Member - Tabpart
  getMember, getMemberNotAssigned, createMember, deleteMember,
  // Member Permission - Tabpart
  getPermission, updatePermission,
  // Member Role - Tabpart
  getRole, createRole, updateRole, deleteRole, updateRolesForMember,
  //time
  getTrackingTime, updateTimeDuration, getTrackingTimeComplete,
  // List task detail
  getListTaskDetail, createTask,
  // List Group Task
  getListGroupTask,
  // getProjectGroup,
  //edit name and description task
  updateNameDescriptionTask,
  // get project detail
  getProjectDetail,
  // get project list basic
  getProjectListBasic,
  // static task
  getStaticTask,
  // delete task
  deleteTask
};

