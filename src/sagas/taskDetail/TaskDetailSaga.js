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
//====== post
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
    // console.log("Api post sub-task", res)
    yield put(actions.postSubTaskSuccess(res))
    yield put(actions.getSubTask({ taskId: "5da183cfc46d8515e03fa9e8" }))
  } catch (error) {
    yield put(actions.postSubTaskFail(error))
  }
}
//=== update
async function doUpdateSubTask(payload) {
  console.log('payload', payload);
  
  try {
    const config = {
      url: `task/update-subtask?sub_task_id=${payload.taskId}&name=${payload.name}`,
      method: 'post',
      data: payload
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* updateSubTask(action) {
  try {
    const res = yield call(doUpdateSubTask, action.options)
    // console.log("Api update sub-task", res)
    yield put(actions.updateSubTaskSuccess(res))
    yield put(actions.getSubTask({ taskId: "5da183cfc46d8515e03fa9e8" }))
  } catch (error) {
    yield put(actions.updateSubTaskFail(error))
  }
}
// ==== delete
async function doDeleteSubTask({ sub_task_id }) {
  
  try {
    const config = {
      url: 'task/delete-subtask?sub_task_id='+ sub_task_id,
      method: 'post',
      data: { sub_task_id}
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* deleteSubTask(action) {
  console.log('action delete', action);
  
  try {
    const res = yield call(doDeleteSubTask, action.options)
    console.log("Api delete sub-task", res)
    yield put(actions.deleteSubTaskSuccess(res))
    yield put(actions.getSubTask({ taskId: "5da183cfc46d8515e03fa9e8" }))
  } catch (error) {
    yield put(actions.deleteSubTaskFail(error))
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
        // CustomEventEmitter(DELETE_ROOM);gi
    } catch (error) {
        yield put(actions.getOfferFail(error))
    }
}

async function doCreateOffer({ createId, content }) {
    try {
        const config = {
            url: '/task/create-offer',
            method: 'post',
            data: {
                task_id: createId,
                content
            }
        }
        const result = await apiService(config);
        return result.data;
    } catch (error) {
        throw error;
    }
}

function* createOffer(action) {
    try {
        const res = yield call(doCreateOffer, action.options)
        console.log("GOI API NE", res)
        yield put(actions.createOfferSuccess(res))
        yield put(actions.getOffer({ taskId: "5da18ce8aa75001b8060eb12" }))

        // CustomEventEmitter(DELETE_ROOM);
    } catch (error) {
        yield put(actions.getOfferFail(error))
    }
}

export {
    getOffer,
    createOffer,
    getSubTask,
    postSubTask,
    updateSubTask,
    deleteSubTask
}
