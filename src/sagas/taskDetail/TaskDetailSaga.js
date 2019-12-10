import { call, put } from 'redux-saga/effects';
import * as actions from '../../actions/taskDetail/taskDetailActions';
import { apiService } from '../../constants/axiosInstance';

// Priority
async function doUpdatePriority(payload) {
  try {
    const config = {
      url: '/task/update-priority',
      method: 'put',
      data: payload
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* updatePriority(action) {
  try {
    const res = yield call(doUpdatePriority, action.payload)
    yield put(actions.updatePrioritySuccess(res))
    yield put(actions.getTaskDetailTabPart({ taskId: "5da1821ad219830d90402fd8" }))

    // CustomEventEmitter(DELETE_ROOM);
  } catch (error) {
    yield put(actions.updatePriorityFail(error))
  }
}

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
      url: 'task/delete-subtask?sub_task_id=' + sub_task_id,
      method: 'post',
      data: { sub_task_id }
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
//====== post with time detail
async function doPostRemindWithTimeDetail(payload) {
  const payloadRemind = {
    content: payload.data.content,
    date_remind: payload.data.date_remind + " " + payload.data.time_remind,
    type_remind: payload.data.type,
    task_id: payload.taskId
  }

  try {
    const config = {
      url: 'task/create-remind/time-detail',
      method: 'post',
      data: payloadRemind
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* postRemindWithTimeDetail(action) {
  try {
    yield call(doPostRemindWithTimeDetail, action.options)
    yield put(actions.getRemind({ taskId: "5da1821ad219830d90402fd8" }))
  } catch (error) {
    yield put(actions.postRemindWithTimeDetailFail(error))
  }
}
// ==== post duration
async function doPostRemindDuration(payload) {
  try {
    const config = {
      url: 'task/create-remind/duration',
      method: 'post',
      data: payload
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* postRemindDuration(action) {
  try {
    const res = yield call(doPostRemindDuration, action.options)
    yield put(actions.postRemindDurationSuccess(res))
    yield put(actions.getRemind({ taskId: "5da1821ad219830d90402fd8" }))
  } catch (error) {
    yield put(actions.postRemindDurationFail(error))
  }
}
// //=== update with time detail
async function doUpdateRemindWithTimeDetail(payload) {
  try {
    const config = {
      url: `task/update-remind/time-detail`,
      method: 'post',
      data: payload
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* updateRemindWithTimeDetail(action) {
  try {
    const res = yield call(doUpdateRemindWithTimeDetail, action.options)
    yield put(actions.updateRemindWithTimeDetailSuccess(res))
    yield put(actions.getRemind({ taskId: "5da1821ad219830d90402fd8" }))
  } catch (error) {
    yield put(actions.updateRemindWithTimeDetailFail(error))
  }
}
// //=== update with duration
async function doUpdateRemindWithDuration(payload) {
  try {
    const config = {
      url: `task/update-remind/duration`,
      method: 'post',
      data: payload
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* updateRemindWithDuration(action) {
  try {
    const res = yield call(doUpdateRemindWithDuration, action.options)
    yield put(actions.updateRemindWithDurationSuccess(res))
    yield put(actions.getRemind({ taskId: "5da1821ad219830d90402fd8" }))
  } catch (error) {
    yield put(actions.updateRemindWithDurationFail(error))
  }
}
// ==== delete
async function doDeleteRemind({ remind_id }) {
  try {
    const config = {
      url: 'task/delete-remind',
      method: 'post',
      data: { remind_id }
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
  } catch (error) {
    yield put(actions.getOfferFail(error))
  }
}

async function doCreateOffer(payload) {
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

function* createOffer(action) {
  try {
    const res = yield call(doCreateOffer, action.payload)
    yield put(actions.createOfferSuccess(res))
    yield put(actions.getOffer({ taskId: "5da1821ad219830d90402fd8" }))
  } catch (error) {
    yield put(actions.createOfferFail(error))
  }
}

async function doUpdateOffer(payload) {
  try {
    const config = {
      url: '/task/update-offer',
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
    yield call(doUpdateOffer, action.payload)
    // yield put(actions.updateOfferSuccess(res))
    yield put(actions.getOffer({ taskId: "5da1821ad219830d90402fd8" }))
  } catch (error) {
    yield put(actions.updateOfferFail(error))
  }
}

async function doDeleteOffer(offer_id) {
  try {
    const config = {
      url: '/task/delete-offer',
      method: 'post',
      data: offer_id
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
    yield put(actions.getOffer({ taskId: "5da1821ad219830d90402fd8" }))
  } catch (error) {
    yield put(actions.deleteOfferFail(error))
  }
}

async function doUploadDocumentToOffer(payload) {
  try {
    const config = {
      url: 'task/upload-document-to-offer',
      method: 'post',
      data: payload
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* uploadDocumentToOffer(action) {
  try {
    const res = yield call(doUploadDocumentToOffer, action.payload.data)
    // Success upload -> Call function to append all new file to component
    action.payload.successCallBack(res.documents)

    yield put(actions.uploadDocumentToOfferSuccess(res))
    yield put(actions.getOffer({ taskId: "5da1821ad219830d90402fd8" }))
  } catch (error) {
    yield put(actions.uploadDocumentToOfferFail(error))
  }
}

async function doDeleteDocumentToOffer(payload) {
  try {
    const config = {
      url: 'task/delete-document-from-offer',
      method: 'post',
      data: payload
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* deleteDocumentToOffer(action) {
  try {
    const res = yield call(doDeleteDocumentToOffer, action.payload.data)
    action.payload.removeCallBack(res)
    yield put(actions.deleteDocumentToOfferSuccess(res))
    yield put(actions.getOffer({ taskId: "5da1821ad219830d90402fd8" }))
  } catch (error) {
    yield put(actions.deleteDocumentToOfferFail(error))
  }
}

async function doHandleOffer(data) {
  try {
    const config = {
      url: 'task/hander-offer',
      method: 'post',
      data
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* handleOffer(action) {
  try {
    const res = yield call(doHandleOffer, action.payload)
    yield put(actions.handleOfferSuccess(res))
    yield put(actions.getOffer({ taskId: "5da1821ad219830d90402fd8" }))
  } catch (error) {
    yield put(actions.handleOfferFail(error))
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
// Location
async function doGetLocation({ taskId }) {
  try {
    const config = {
      url: '/task/get-location?task_id=' + taskId,
      method: 'get'
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* getLocation(action) {
  try {
    const res = yield call(doGetLocation, action.options)
    yield put(actions.getLocationTabPartSuccess(res))
  } catch (error) {
    yield put(actions.getLocationTabPartFail(error))
  }
}

// Task Detail - TabPart - Cot phai
async function doGetTaskDetail({ taskId }) {
  try {
    const config = {
      url: '/task/detail?task_id=' + taskId,
      method: 'get'
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* getTaskDetail(action) {
  try {
    const res = yield call(doGetTaskDetail, action.options)
    yield put(actions.getTaskDetailTabPartSuccess(res))
  } catch (error) {
    yield put(actions.getTaskDetailTabPartFail(error))
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
  } catch (error) {
    yield put(actions.createCommandFail(error))
  }
}

async function doUpdateCommand(payload) {
  try {
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
    yield put(actions.getCommand({ task_id: "5da1821ad219830d90402fd8" }))
  } catch (error) {
    yield put(actions.updateCommandFail(error))
  }
}

async function doDeleteCommand(payload) {
  try {
    const config = {
      url: 'task/delete-command-decision',
      method: 'post',
      data: payload
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* deleteCommand(action) {
  try {
    const res = yield call(doDeleteCommand, action.payload)
    yield put(actions.deleteCommandSuccess(res))
    yield put(actions.getCommand({ task_id: "5da1821ad219830d90402fd8" }))
  } catch (error) {
    yield put(actions.deleteCommandFail(error))
  }
}

// Member
async function doGetMember({ task_id }) {
  try {
    const config = {
      url: 'task/get-member?task_id=' + task_id,
      method: 'get'
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}
function* getMember(action) {
  try {
    const res = yield call(doGetMember, action.payload)
    yield put(actions.getMemberSuccess(res))
  } catch (error) {
    yield put(actions.getMemberFail(error))
  }
}

async function doGetMemberNotAssigned({ task_id }) {
  try {
    const config = {
      url: 'task/get-member-not-assigned?task_id=' + task_id,
      method: 'get'
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* getMemberNotAssigned(action) {
  try {
    const res = yield call(doGetMemberNotAssigned, action.payload)
    yield put(actions.getMemberNotAssignedSuccess(res))
  } catch (error) {
    yield put(actions.getMemberNotAssignedFail(error))
  }
}

async function doCreateMember(payload) {
  try {
    const config = {
      url: 'task/add-member',
      method: 'post',
      data: payload
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* createMember(action) {
  try {
    const res = yield call(doCreateMember, action.payload)
    yield put(actions.createMemberSuccess(res))
  } catch (error) {
    yield put(actions.createMemberFail(error))
  }
}

async function doDeleteMember(payload) {
  try {
    const config = {
      url: 'task/remove-member',
      method: 'post',
      data: payload
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* deleteMember(action) {
  try {
    const res = yield call(doDeleteMember, action.payload)
    yield put(actions.deleteMemberSuccess(res))
  } catch (error) {
    yield put(actions.deleteMemberFail(error))
  }
}

// Get list task detail
async function doGetListTaskDetail({ project_id }) {
  try {
    const config = {
      url: 'task/list-task-detail?project_id=' + project_id,
      method: 'get'
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}
function* getListTaskDetail(action) {
  try {
    const res = yield call(doGetListTaskDetail, action.payload)
    yield put(actions.getListTaskDetailSuccess(res))
  } catch (error) {
    yield put(actions.getListTaskDetailFail(error))
  }
}
//time
async function doGetTrackingTime(taskId) {
  try {
    const config = {
      url: 'task/get-tracking-time?task_id=' + taskId,
      method: 'get'
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}
function* getTrackingTime(action) {
  try {
    const res = yield call(doGetTrackingTime, action.payload)

    yield put(actions.getTrackingTimeSuccess(res))
  } catch (error) {
    yield put(actions.getTrackingTimeFail(error))
  }
}

async function doUpdateTimeDuration(payload) {
  try {
    const config = {
      url: 'task/update-time-duration',
      method: 'put',
      data: payload
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}
function* updateTimeDuration(action) {
  try {

    const res = yield call(doUpdateTimeDuration, action.payload)
    yield put(actions.updateTimeDurationSuccess(res))
    yield put(actions.getTrackingTime(action.payload.task_id))

  } catch (error) {
    yield put(actions.updateTimeDurationFail)
  }
}

// Member Role

async function doCreateRole(payload) {
  try {
    const config = {
      url: 'role-task/create-role-task',
      method: 'post',
      data: payload
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* createRole(action) {
  try {
    const res = yield call(doCreateRole, action.payload)
    yield put(actions.createRoleSuccess(res))
  } catch (error) {
    yield put(actions.createRoleFail(error))
  }
}

async function doUpdateRole(payload) {
  try {
    const config = {
      url: 'role-task/update-role-task',
      method: 'put',
      data: payload
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* updateRole(action) {
  try {
    const res = yield call(doUpdateRole, action.payload)
    yield put(actions.updateRoleSuccess(res))
  } catch (error) {
    yield put(actions.updateRoleFail(error))
  }
}

async function doDeleteRole(payload) {
  try {
    const config = {
      url: 'role-task/delete-role-task',
      method: 'delete',
      data: payload
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* deleteRole(action) {
  try {
    const res = yield call(doDeleteRole, action.payload)
    yield put(actions.deleteRoleSuccess(res))
  } catch (error) {
    yield put(actions.deleteRoleFail(error))
  }
}

async function doCreateTask(payload) {

  try {
    const config = {
      url: 'task/create',
      method: 'post',
      data: payload
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* createTask(action) {
  try {
    const res = yield call(doCreateTask, action.payload)
    yield put(actions.createTaskSuccess(res))
    yield put(actions.getListTaskDetail({ project_id: '5de5c4b9f9e332da9ebd6b3c' }))
  } catch (error) {
    yield put(actions.createTaskFail(error))
  }
}

// Get list ground task
async function doGetListGroupTask({ project_id }) {
  try {
    const config = {
      url: 'group-task/list?project_id=' + project_id,
      method: 'get'
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}
function* getListGroupTask(action) {
  try {
    const res = yield call(doGetListGroupTask, action.payload)
    yield put(actions.getListGroupTaskSuccess(res))
  } catch (error) {
    yield put(actions.getListGroupTaskFail(error))
  }
}
// Get project group - listpart
async function doGetProjectGroup() {
  try {
    const config = {
      url: 'project-group/list',
      method: 'get'
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}
async function doGetListProject(payload) {
  try {
    const config = {
      url: 'project/list',
      method: 'get',
      data: payload
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* getProjectGroup() {
  try {
    const response = yield call(doGetProjectGroup)
    let projectGroups = response.project_groups
    for (let i = 0; i < projectGroups.length; i++) {
      let payload = {
        group_project: projectGroups[i].id,
        type: "active",
        status: 0
      }
      const tempResponse = yield call(doGetListProject, payload)
      projectGroups.projects = tempResponse.projects
    }

    yield put(actions.getProjectGroupSuccess(projectGroups))
    // yield put(actions.getListProject())
  } catch (error) {
    yield put(actions.getProjectGroupFail(error))
  }
}
export {
  // Update Priority
  updatePriority,

  // Offer::
  getOffer,
  createOffer,
  deleteOffer,
  updateOffer,
  uploadDocumentToOffer,
  deleteDocumentToOffer,
  handleOffer,

  // Remind::
  getRemind,
  postRemindWithTimeDetail,
  postRemindDuration,
  updateRemindWithTimeDetail,
  updateRemindWithDuration,
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
  // Location
  getLocation,
  // Task Detail - TabPart- Cot phai
  getTaskDetail,
  // Command and Decision::
  getCommand,
  createCommand,
  updateCommand,
  deleteCommand,

  // Member - Tabpart
  getMember,
  getMemberNotAssigned,
  createMember,
  deleteMember,

  // Member Role - Tabpart
  createRole,
  updateRole,
  deleteRole,

  //time
  getTrackingTime,
  updateTimeDuration,

  // List task detail
  getListTaskDetail,
  createTask,
  // List Group Task
  getListGroupTask,
  getProjectGroup
}
