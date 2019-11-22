import { call, put } from 'redux-saga/effects';
import * as actions from '../../actions/taskDetail/taskDetailActions';
import { apiService } from '../../constants/axiosInstance';

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
    yield put(actions.postSubTaskSuccess(res))
    yield put(actions.getSubTask({ taskId: "5da1821ad219830d90402fd8" }))
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
    yield put(actions.updateSubTaskSuccess(res))
    yield put(actions.getSubTask({ taskId: "5da1821ad219830d90402fd8" }))
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
  
  try {
    const res = yield call(doDeleteSubTask, action.options)
    yield put(actions.deleteSubTaskSuccess(res))
    yield put(actions.getSubTask({ taskId: "5da1821ad219830d90402fd8" }))
  } catch (error) {
    yield put(actions.deleteSubTaskFail(error))
  }
}
// ===== complete sub task
async function doCompleteSubTask(payload) {
  try {
    const config = {
      url: 'task/complete-subtask',
      method: 'post',
      data: payload
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* completeSubTask(action) {
  try {
    const res = yield call(doCompleteSubTask, action.options)
    yield put(actions.completeSubTaskSuccess(res))
    yield put(actions.getSubTask({ taskId: "5da1821ad219830d90402fd8" }))
  } catch (error) {
    yield put(actions.completeSubTaskFail(error))
  }
}






// Remind::::::::::::::::::::::::::::::::::::::::::::::::
async function doGetRemind({ taskId }) {
  try {
    const config = {
      url: 'task/get-remind?task_id=' + taskId,
      method: 'get'
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* getRemind(action) {
  try {
    const res = yield call(doGetRemind, action.options)
    yield put(actions.getRemindSuccess(res))
  } catch (error) {
    yield put(actions.getRemindFail(error))
  }
}
// //====== post
// async function doPostRemind(payload) {
//   try {
//     const config = {
//       url: 'task/create-remind',
//       method: 'post',
//       data: payload
//     }
//     const result = await apiService(config);
//     return result.data;
//   } catch (error) {
//     throw error;
//   }
// }

// function* postSubTask(action) {
//   try {
//     const res = yield call(doPostSubTask, action.options)
//     // console.log("Api post sub-task", res)
//     yield put(actions.postSubTaskSuccess(res))
//     yield put(actions.getSubTask({ taskId: "5da183cfc46d8515e03fa9e8" }))
//   } catch (error) {
//     yield put(actions.postSubTaskFail(error))
//   }
// }
// //=== update
// async function doUpdateSubTask(payload) {
//   console.log('payload', payload);
  
//   try {
//     const config = {
//       url: `task/update-subtask?sub_task_id=${payload.taskId}&name=${payload.name}`,
//       method: 'post',
//       data: payload
//     }
//     const result = await apiService(config);
//     return result.data;
//   } catch (error) {
//     throw error;
//   }
// }

// function* updateSubTask(action) {
//   try {
//     const res = yield call(doUpdateSubTask, action.options)
//     // console.log("Api update sub-task", res)
//     yield put(actions.updateSubTaskSuccess(res))
//     yield put(actions.getSubTask({ taskId: "5da183cfc46d8515e03fa9e8" }))
//   } catch (error) {
//     yield put(actions.updateSubTaskFail(error))
//   }
// }
// ==== delete
async function doDeleteRemind({ remind_id }) {
  console.log('remind', remind_id)
  try {
    const config = {
      url: 'task/delete-remind',
      method: 'post',
      data: {remind_id}
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* deleteRemind(action) {
  try {
    const res = yield call(doDeleteRemind, action.payload)
    console.log("Api delete", res)
    yield put(actions.deleteRemindSuccess(res))
    yield put(actions.getRemind({ taskId: "5da1821ad219830d90402fd8" }))
  } catch (error) {
    yield put(actions.deleteRemindFail(error))
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
    yield put(actions.createOfferFail(error))
  }
}

async function doUpdateOffer(payload) {
  try {
    const config = {
      url: '/task/create-offer',
      method: 'post',
      data: payload
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* updateOffer(action) {
  try {
    const res = yield call(doUpdateOffer, action.payload)
    yield put(actions.updateOfferSuccess(res))
    yield put(actions.getOffer({ taskId: "5da18ce8aa75001b8060eb12" }))

    // CustomEventEmitter(DELETE_ROOM);
  } catch (error) {
    yield put(actions.updateOfferFail(error))
  }
}

async function doDeleteOffer(offer_id) {
  try {
    const config = {
      url: '/task/delete-offer/',
      method: 'post',
      data: {
        offer_id
      }
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* deleteOffer(action) {
  try {
    const res = yield call(doDeleteOffer, action.payload)
    yield put(actions.deleteOfferSuccess(res))
    yield put(actions.getOffer({ taskId: "5da18ce8aa75001b8060eb12" }))

    // CustomEventEmitter(DELETE_ROOM);
  } catch (error) {
    yield put(actions.getOfferFail(error))
  }
}
// Media Image
async function doGetImage({ taskId }) {
  try {
    const config = {
      url: '/task/get-image?task_id=' + taskId,
      method: 'get'
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* getImage(action) {
  try {
    const res = yield call(doGetImage, action.options)
    yield put(actions.getImageSuccess(res))
  } catch (error) {
    yield put(actions.getImageFail(error))
  }
}

// Media File
async function doGetFile({ taskId }) {
  try {
    const config = {
      url: '/task/get-file?task_id=' + taskId,
      method: 'get'
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* getFile(action) {
  try {
    const res = yield call(doGetFile, action.options)
    yield put(actions.getFileTabPartSuccess(res))
  } catch (error) {
    yield put(actions.getFileTabPartFail(error))
  }
}
// Media Link
async function doGetLink({ taskId }) {
  try {
    const config = {
      url: '/task/get-link?task_id=' + taskId,
      method: 'get'
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* getLink(action) {
  try {
    const res = yield call(doGetLink, action.options)
    yield put(actions.getLinkTabPartSuccess(res))
  } catch (error) {
    yield put(actions.getLinkTabPartFail(error))
  }
}


//Command
async function doGetCommand({ task_id }) {
  try {    
    const config = {
      url: 'task/get-command-decision?task_id=' + task_id,
      method: 'get'
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* getCommand(action) {
  try {
    const res = yield call(doGetCommand, action.options)
    yield put(actions.getCommandSuccess(res))
  } catch (error) {
    yield put(actions.getCommandFail(error))
  }
}

async function doCreateCommand(payload) {
  try {
    const config = {
      url: 'task/create-command-decision',
      method: 'post',
      data: payload
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* createCommand(action) {
  try {
    const res = yield call(doCreateCommand, action.payload)
    yield put(actions.createCommandSuccess(res))
    yield put(actions.getCommand({ task_id: "5da1821ad219830d90402fd8" }))

    // CustomEventEmitter(DELETE_ROOM);
  } catch (error) {
    yield put(actions.createCommandFail(error))
  }
}

async function doUpdateCommand(payload) {
  try {
    console.log('payload', payload)
    const config = {
      url: 'task/update-command-decision',
      method: 'post',
      data: payload
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* updateCommand(action) {
  try {
    const res = yield call(doUpdateCommand, action.payload)
    yield put(actions.updateCommandSuccess(res))
    console.log('API:::', res)
    yield put(actions.getCommand({ task_id: "5da1821ad219830d90402fd8" }))

    // CustomEventEmitter(DELETE_ROOM);
  } catch (error) {
    yield put(actions.updateCommandFail(error))
  }
}

export {
  // Offer::
  getOffer,
  createOffer,
  deleteOffer,
  updateOffer,
  
  // Remind::
  getRemind,
  deleteRemind,

  // Sub-Task::
  getSubTask,
  postSubTask,
  updateSubTask,
  deleteSubTask,
  completeSubTask,

  // Media Image File
  getImage,
  getFile,
  getLink,
  
  // Command and Decision::
  getCommand,
  createCommand,
  updateCommand
}
