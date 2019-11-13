import { call, put } from 'redux-saga/effects';
import * as actions from '../../actions/taskDetail/taskDetailActions';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, DELETE_ROOM } from '../../constants/events';


// Sub-task::
async function doGetSubTask({ taskId }) {
  try {
    const config = {
      url: 'task/get-subtask?task_id=' + taskId,
      method: 'get'
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* getSubTask(action) {
  try {
    const res = yield call(doGetSubTask, action.options)
    yield put(actions.getSubTaskSuccess(res))
  } catch (error) {
    yield put(actions.getSubTaskFail(error))
  }
}
// post
async function doPostSubTask(payload) {
  try {
    const config = {
      url: 'task/create-subtask',
      method: 'post',
      data: payload
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* postSubTask(action) {
  try {
    const res = yield call(doPostSubTask, action.options)
    console.log("Api post sub-task", res)
    yield put(actions.postSubTaskSuccess(res))
    yield put(actions.getSubTask({ taskId: "5da183cfc46d8515e03fa9e8" }))
  } catch (error) {
    yield put(actions.postSubTaskFail(error))
  }
}


//Offer::
async function doGetOffer({ taskId }) {
  try {
    const config = {
      url: '/task/get-offer?task_id=' + taskId,
      method: 'get'
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* getOffer(action) {
  try {
    const res = yield call(doGetOffer, action.options)
    yield put(actions.getOfferSuccess(res))
    console.log("GOI API NE", res)
    // CustomEventEmitter(DELETE_ROOM);
  } catch (error) {
    yield put(actions.getOfferFail(error))
  }
}

export {
  getOffer,
  getSubTask,
  postSubTask
}
