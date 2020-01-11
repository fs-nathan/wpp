import { call, put } from 'redux-saga/effects';
import * as actions from '../../actions/taskDetail/taskDetailActions';
import { apiService } from '../../constants/axiosInstance';
// import { getFirstProjectDetail } from '../../helpers/jobDetail/arrayHelper'

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
    yield put(actions.getTaskDetailTabPart(action.payload.task_id))

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
    // console.log("action payload id::", action.options.task_id);
    const res = yield call(doPostSubTask, action.options)
    yield put(actions.postSubTaskSuccess(res))
    yield put(actions.getSubTask({ taskId: action.options.task_id}))
  } catch (error) {
    yield put(actions.postSubTaskFail(error))
  }
}
//=== update
async function doUpdateSubTask(payload) {
  try {
    const config = {
      url: `task/update-subtask?sub_task_id=${payload.sub_task_id}&name=${payload.name}`,
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
  const data = {
    sub_task_id : action.options.sub_task_id,
    name : action.options.name
  }
  try {
    const res = yield call(doUpdateSubTask, data)
    yield put(actions.updateSubTaskSuccess(res))
    yield put(actions.getSubTask(action.options.taskId))
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
    const res = yield call(doDeleteSubTask, action.options.sub_task_id)
    yield put(actions.deleteSubTaskSuccess(res))
    yield put(actions.getSubTask(action.options.taskId))
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
    const res = yield call(doCompleteSubTask, {sub_task_id: action.options.sub_task_id})
    yield put(actions.completeSubTaskSuccess(res))
    yield put(actions.getSubTask({taskId: action.options.taskId}))
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
    yield put(actions.getRemind({ taskId: action.options.taskId}))
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
    yield put(actions.getRemind({ taskId: action.options.task_id}))
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
    const res = yield call(doUpdateRemindWithTimeDetail, action.options.data)
    yield put(actions.updateRemindWithTimeDetailSuccess(res))
    yield put(actions.getRemind({taskId: action.options.taskId}))
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
    const res = yield call(doUpdateRemindWithDuration, action.options.data)
    yield put(actions.updateRemindWithDurationSuccess(res))
    yield put(actions.getRemind({ taskId: action.options.taskId}))
  } catch (error) {
    yield put(actions.updateRemindWithDurationFail(error))
  }
}
// ==== delete
async function doDeleteRemind(payload) {
  try {
    const config = {
      url: 'task/delete-remind',
      method: 'post',
      data: payload
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* deleteRemind(action) {
  try {
    const res = yield call(doDeleteRemind, {remind_id: action.payload.remind_id})
    yield put(actions.deleteRemindSuccess(res))
    yield put(actions.getRemind({taskId: action.payload.taskId}))
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
    const res = yield call(doCreateOffer, action.payload.data)
    yield put(actions.createOfferSuccess(res))
    yield put(actions.getOffer({taskId: action.payload.taskId}))
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
  const data = {
    offer_id: action.payload.offerId,
    content: action.payload.content
  }
  try {
    yield call(doUpdateOffer, data)
    // yield put(actions.updateOfferSuccess(res))
    yield put(actions.getOffer({taskId: action.payload.taskId}))
  } catch (error) {
    yield put(actions.updateOfferFail(error))
  }
}

async function doDeleteOffer(payload) {
  try {
    const config = {
      url: '/task/delete-offer',
      method: 'post',
      data: payload
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* deleteOffer(action) {
  try {
    // console.log("offer_id:::::::", action.payload);
    const res = yield call(doDeleteOffer, {offer_id: action.payload.offer_id})
    yield put(actions.deleteOfferSuccess(res))
    yield put(actions.getOffer({ taskId :action.payload.taskId}))
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
    yield put(actions.getOffer(action.payload.taskId))
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
    yield put(actions.getOffer(action.payload.taskId))
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
    const res = yield call(doHandleOffer, action.payload.data)
    yield put(actions.handleOfferSuccess(res))
    yield put(actions.getOffer({ taskId: action.payload.taskId}))
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
async function doGetCommand({task_id}) {
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
    yield put(actions.getCommand({task_id: action.payload.task_id}))
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
  const data = {
    command_id: action.payload.command_id,
    content: action.payload.content,
    type: action.payload.type
  }
  try {
    const res = yield call(doUpdateCommand, data)
    yield put(actions.updateCommandSuccess(res))
    yield put(actions.getCommand({task_id: action.payload.taskId}))
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
    const res = yield call(doDeleteCommand, {command_id: action.payload.command_id})
    yield put(actions.deleteCommandSuccess(res))
    yield put(actions.getCommand({task_id: action.payload.task_id}))
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

// Member Permission
async function doGetPermission(payload) {
  try {
    const config = {
      url: '/task/get-group-permission',
      method: 'get',
      data: payload
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* getPermission(action) {
  try {
    const res = yield call(doGetPermission, action.payload)
    yield put(actions.getPermissionSuccess(res))
  } catch (error) {
    yield put(actions.getPermissionFail(error))
  }
}

async function doUpdatePermission(payload) {
  try {
    const config = {
      url: '/task/update-group-permission-member',
      method: 'post',
      data: payload
    }
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
  } catch (error) {
    yield put(actions.updatePermissionFail(error))
  }
}

// Member Role
async function doGetRole(payload) {
  try {
    const config = {
      url: '/list-user-role',
      method: 'get',
      data: payload
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* getRole(action) {
  try {
    const res = yield call(doGetRole, action.payload)
    yield put(actions.getRoleSuccess(res))
  } catch (error) {
    yield put(actions.getRoleFail(error))
  }
}


async function doCreateRole(payload) {
  try {
    const config = {
      url: '/create-user-role',
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
    yield put(actions.getRole())
  } catch (error) {
    yield put(actions.createRoleFail(error))
  }
}

async function doUpdateRole(payload) {
  try {
    const config = {
      url: '/update-user-role',
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
    yield put(actions.getRole())
  } catch (error) {
    yield put(actions.updateRoleFail(error))
  }
}

async function doDeleteRole(payload) {
  try {
    const config = {
      url: '/delete-user-role',
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
    yield put(actions.getRole())
  } catch (error) {
    yield put(actions.deleteRoleFail(error))
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
    const res = yield call(doCreateTask, action.payload.data)
    yield put(actions.createTaskSuccess(res))
    yield put(actions.getListTaskDetail({ project_id: action.payload.projectId }))
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
// async function doGetProjectGroup() {
//   try {
//     const config = {
//       url: 'project-group/list',
//       method: 'get'
//     }
//     const result = await apiService(config);
//     return result.data;
//   } catch (error) {
//     throw error;
//   }
// }

// async function doGetListProject(payload) {
//   try {
//     const config = {
//       url: 'project/list',
//       method: 'get',
//       data: payload
//     }
//     const result = await apiService(config);
//     return result.data;
//   } catch (error) {
//     throw error;
//   }
// }

// function* getProjectGroup() {
//   try {
//     const response = yield call(doGetProjectGroup)
//     let projectGroups = response.project_groups

//     let projectId = ""
//     for (let i = 0; i < projectGroups.length; i++) {
//       let payload = {
//         group_project: projectGroups[i].id,
//         type: "active",
//         status: 0
//       }
//       const tempResponse = yield call(doGetListProject, payload)
//       projectGroups[i].projects = tempResponse.projects
      // set active project id to call other API
//       if (i === 0) projectId = getFirstProjectId(projectGroups[i])
//     }

//     yield put(actions.getProjectGroupSuccess({ projectGroups, projectId }))
//   } catch (error) {
//     yield put(actions.getProjectGroupFail(error))
//   }
// }
// Get Group Project list basic
async function doGetProjectListBasic() {
  try {
    const config = {
      url: 'project/list-basic',
      method: 'get'
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* getProjectListBasic(action) {
  try {
    const response = yield call(doGetProjectListBasic)
    let projectGroups = response.projects

    const projectId = action.payload || ""
    // // set active project id to call other API
    // let projectDetail = getFirstProjectDetail(projectGroups)
    // if(projectDetail.id) projectId = projectDetail.id 
    
    yield put(actions.getProjectListBasicSuccess({projectGroups, projectId}))
  } catch (error) {
    yield put(actions.getProjectListBasicFail(error))
  }
}


// update name and description
async function doUpdateNameDescriptionTask(payload) {
  try {
    const config = {
      url: 'task/update-name-description',
      method: 'put',
      data: payload,
    }
    const result = await apiService(config);
    return result.data;
    // return null;
  } catch (error) {
    throw error;
  }
}

function* updateNameDescriptionTask(action) {
  try {
    const res = yield call(doUpdateNameDescriptionTask, action.payload.dataNameDescription)
    const taskId = action.payload.dataNameDescription.task_id
    yield put(actions.updateNameDescriptionTaskSuccess(res))
    yield put(actions.getTaskDetailTabPart({ taskId }))
    const resTime = yield call(doUpdateTimeDuration, action.payload.dataTimeDuration)
    yield put(actions.updateTimeDurationSuccess(resTime))
    yield put(actions.getTrackingTime(action.payload.dataTimeDuration.task_id))
  } catch (error) {
    yield put(actions.updateNameDescriptionTaskFail(error))
  }
}

// Get Project Detail
async function doGetProjectDetail(project_id) {

  // console.log("PPPP", project_id)
  try {
    const config = {
      url: 'project/detail?project_id=' + project_id,
      method: 'get'
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}
function* getProjectDetail(action) {
  try {
    const res = yield call(doGetProjectDetail, action.payload)


    yield put(actions.getProjectDetailSuccess(res))
  } catch (error) {
    yield put(actions.getProjectDetailFail(error))
  }
}
//updateComplete
async function doUpdateComplete(payload){
  try {
    const config = {
      url: 'task/update-complete',
      method: 'put',
      data: payload,
    }
    const result = await apiService(config);
    return result.data;
    // return null;
  } catch (error) {
    throw error;
  }
}
function*updateComplete(action){
  try {
    console.log("action.payload:::::::", action.payload);
    
    const res =yield call(doUpdateComplete,action.payload.data)
    
    yield put(actions.updateCompleteSuccess(res))
    yield put(actions.getListTaskDetail({project_id: action.payload.projectId}))
  } catch (error) {
    yield put(actions.updateCommandFail(error))
  }
}

// static task
async function doGetStaticTask(project_id) {

  // console.log("PPPP", project_id)
  try {
    const config = {
      url: '/task/static?project_id=' + project_id,
      method: 'get'
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}
function* getStaticTask(action) {
  try {
    const res =yield call(doGetStaticTask, action.payload)
    yield put(actions.getStaticTaskSuccess(res))
  } catch (error) {
    yield put(actions.getStaticTaskFail(error))
  }
}

export {
  //updateComplete
  updateComplete,
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

  // Member Permission - Tabpart
  getPermission,
  updatePermission,

  // Member Role - Tabpart
  getRole,
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
  // getProjectGroup,
  //edit name and description task
  updateNameDescriptionTask,
  // get project detail
  getProjectDetail,
  // get project list basic
  getProjectListBasic,
  // static task
  getStaticTask,
}
