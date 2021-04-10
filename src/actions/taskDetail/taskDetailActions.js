import * as types from '../../constants/actions/taskDetail/taskDetailConst';

// sub-task
export const getSubTask = ({ taskId }) => ({
    type: types.GET_SUBTASK_REQUEST,
    options: {
        taskId,
    },
});

export const getSubTaskSuccess = (payload) => ({
    type: types.GET_SUBTASK_SUCCESS,
    payload
});

export const getSubTaskFail = (error) => ({
    type: types.GET_SUBTASK_FAIL,
    error: error,
});
// ======= post
export const postSubTask = (payload) => ({
    type: types.POST_SUBTASK_REQUEST,
    options: payload,
});

export const postSubTaskSuccess = (payload) => ({
    type: types.POST_SUBTASK_SUCCESS,
    payload
});

export const postSubTaskFail = (error) => ({
    type: types.POST_SUBTASK_FAIL,
    error: error,
});
// ===== update
export const updateSubTask = ({ sub_task_id, name, taskId }) => ({
    type: types.UPDATE_SUBTASK_REQUEST,
    options: {
        sub_task_id,
        name,
        taskId
    },
});

export const updateSubTaskSuccess = (payload) => ({
    type: types.UPDATE_SUBTASK_SUCCESS,
    payload
});

export const updateSubTaskFail = (error) => ({
    type: types.UPDATE_SUBTASK_FAIL,
    error: error,
});
// ===== delete
export const deleteSubTask = ({ sub_task_id, taskId }) => ({
    type: types.DELETE_SUBTASK_REQUEST,
    options: {
        sub_task_id,
        taskId
    },
});

export const deleteSubTaskSuccess = (payload) => ({
    type: types.DELETE_SUBTASK_SUCCESS,
    payload
});

export const deleteSubTaskFail = (error) => ({
    type: types.DELETE_SUBTASK_FAIL,
    error: error,
});
// ===== complete
export const completeSubTask = ({ sub_task_id, taskId }) => ({
    type: types.POST_COMPLETE_SUBTASK_REQUEST,
    options: {
        sub_task_id,
        taskId
    },
});

export const completeSubTaskSuccess = (payload) => ({
    type: types.POST_COMPLETE_SUBTASK_SUCCESS,
    payload
});

export const completeSubTaskFail = (error) => ({
    type: types.POST_COMPLETE_SUBTASK_FAIL,
    error: error,
});

//remind
export const getRemind = ({ taskId }) => ({
    type: types.GET_REMIND_REQUEST,
    options: {
        taskId
    },
});

export const getRemindSuccess = (payload) => ({
    type: types.GET_REMIND_SUCCESS,
    payload
});

export const getRemindFail = (error) => ({
    type: types.GET_REMIND_FAIL,
    error: error
});
// post remind with time detail
export const postRemindWithTimeDetail = (payload) => ({
    type: types.POST_REMIND_TIME_DETAIL_REQUEST,
    options: payload,
});
export const postRemindWithTimeDetailSuccess = (payload) => ({
    type: types.POST_REMIND_TIME_DETAIL_SUCCESS,
    payload
});

export const postRemindWithTimeDetailFail = (error) => ({
    type: types.POST_REMIND_TIME_DETAIL_FAIL,
    error: error,
});
// post remind duration
export const postRemindDuration = (payload) => ({
    type: types.POST_REMIND_DURATION_REQUEST,
    options: payload,
});
export const postRemindDurationSuccess = (payload) => ({
    type: types.POST_REMIND_DURATION_SUCCESS,
    payload
});

export const postRemindDurationFail = (error) => ({
    type: types.POST_REMIND_DURATION_FAIL,
    error: error,
});
// update with time duration
export const updateRemindWithTimeDetail = (payload) => ({
    type: types.UPDATE_REMIND_TIME_DETAIL_REQUEST,
    options: payload,
});

export const updateRemindWithTimeDetailSuccess = (payload) => ({
    type: types.UPDATE_REMIND_TIME_DETAIL_SUCCESS,
    payload
});

export const updateRemindWithTimeDetailFail = (error) => ({
    type: types.UPDATE_REMIND_TIME_DETAIL_FAIL,
    error: error,
});
// update remind duration
export const updateRemindWithDuration = (payload) => ({
    type: types.UPDATE_REMIND_DURATION_REQUEST,
    options: payload,
});

export const updateRemindWithDurationSuccess = (payload) => ({
    type: types.UPDATE_REMIND_DURATION_SUCCESS,
    payload
});

export const updateRemindWithDurationFail = (error) => ({
    type: types.UPDATE_REMIND_DURATION_FAIL,
    error: error,
});
// ======= delete remind
export const deleteRemind = ({ remind_id, taskId }) => ({
    type: types.DELETE_REMIND_REQUEST,
    payload: {
        remind_id,
        taskId
    }
});

export const deleteRemindSuccess = (remind_id) => ({
    type: types.DELETE_REMIND_SUCCESS,
    payload: remind_id
});

export const deleteRemindFail = (error) => ({
    type: types.DELETE_REMIND_FAIL,
    error: error
});
// ======= pin remind
export const pinRemind = ({ remind_id, taskId }) => ({
    type: types.PIN_REMIND_REQUEST,
    payload: {
        remind_id,
        taskId
    }
});

export const pinRemindSuccess = (remind_id) => ({
    type: types.PIN_REMIND_SUCCESS,
    payload: remind_id
});

export const pinRemindFail = (error) => ({
    type: types.PIN_REMIND_FAIL,
    error: error
});
// ======= unPin remind
export const unPinRemind = ({ remind_id, taskId }) => ({
    type: types.UNPIN_REMIND_REQUEST,
    payload: {
        remind_id,
        taskId
    }
});

export const unPinRemindSuccess = (remind_id) => ({
    type: types.UNPIN_REMIND_SUCCESS,
    payload: remind_id
});

export const unPinRemindFail = (error) => ({
    type: types.UNPIN_REMIND_FAIL,
    error: error
});
//  offer
export const getOffer = ({ taskId }) => ({
    type: types.GET_OFFER_REQUEST,
    options: {
        taskId,
    },
});

export const getOfferSuccess = (payload) => ({
    type: types.GET_OFFER_SUCCESS,
    payload
});

export const getOfferFail = (error) => ({
    type: types.GET_OFFER_FAIL,
    error: error,
});

export const createOffer = (payload) => ({
    type: types.CREATE_OFFER_REQUEST,
    payload
});

export const createOfferSuccess = (payload) => ({
    type: types.CREATE_OFFER_SUCCESS,
    payload
});

export const createOfferFail = (error) => ({
    type: types.CREATE_OFFER_FAIL,
    error: error,
});

export const updateOffer = (payload) => ({
    type: types.UPDATE_OFFER_REQUEST,
    payload
});

export const updateOfferSuccess = (payload) => ({
    type: types.UPDATE_OFFER_SUCCESS,
    payload
});

export const updateOfferFail = (error) => ({
    type: types.UPDATE_OFFER_FAIL,
    error: error,
});

export const deleteOffer = payload => ({
    type: types.DELETE_OFFER_REQUEST,
    payload
});

export const deleteOfferSuccess = (payload) => ({
    type: types.DELETE_OFFER_SUCCESS,
    payload
});

export const deleteOfferFail = (error) => ({
    type: types.DELETE_OFFER_FAIL,
    error: error,
});

export const approveOffer = payload => ({
    type: types.APPROVE_OFFER_REQUEST,
    payload
});

export const approveOfferSuccess = (payload) => ({
    type: types.APPROVE_OFFER_SUCCESS,
    payload
});

export const approveOfferFail = (error) => ({
    type: types.APPROVE_OFFER_FAIL,
    error: error,
});
// ==== upload document to offer
export const uploadDocumentToOffer = (data, cb, taskId) => ({
    type: types.UPLOAD_DOCUMENT_TO_OFFER_REQUEST,
    payload: { data, successCallBack: cb, taskId }
});

export const uploadDocumentToOfferSuccess = (payload) => ({
    type: types.UPLOAD_DOCUMENT_TO_OFFER_SUCCESS,
    payload
});

export const uploadDocumentToOfferFail = (error) => ({
    type: types.UPLOAD_DOCUMENT_TO_OFFER_FAIL,
    error: error,
});
// === delete document to offer
export const deleteDocumentToOffer = (data, cb, taskId) => ({
    type: types.DELETE_DOCUMENT_TO_OFFER_REQUEST,
    payload: { data, removeCallBack: cb, taskId }
});

export const deleteDocumentToOfferSuccess = (payload) => ({
    type: types.DELETE_DOCUMENT_TO_OFFER_SUCCESS,
    payload
});

export const deleteDocumentToOfferFail = (error) => ({
    type: types.HANDLE_OFFER_REQUEST,
    error: error,
});
// === handle offer
export const handleOffer = (payload) => ({
    type: types.HANDLE_OFFER_REQUEST,
    payload
});

export const handleOfferSuccess = (payload) => ({
    type: types.HANDLE_OFFER_SUCCESS,
    payload
});

export const handleOfferFail = (error) => ({
    type: types.HANDLE_OFFER_FAIL,
    error: error
});


//Command and Decision::
export const getCommand = ({ task_id }) => ({
    type: types.GET_COMMAND_REQUEST,
    options: { task_id }
});

export const getCommandSuccess = (payload) => ({
    type: types.GET_COMMAND_SUCCESS,
    payload
});

export const getCommandFail = (error) => ({
    type: types.GET_COMMAND_FAIL,
    error: error
});
export const createCommand = (payload) => ({
    type: types.CREATE_COMMAND_REQUEST,
    payload
});

export const createCommandSuccess = (payload) => ({
    type: types.CREATE_COMMAND_SUCCESS,
    payload
});

export const createCommandFail = (error) => ({
    type: types.CREATE_OFFER_FAIL,
    error: error,
});


export const updateCommand = (payload) => ({
    type: types.UPDATE_COMMAND_REQUEST,
    payload
});

export const updateCommandSuccess = (payload) => ({
    type: types.UPDATE_COMMAND_SUCCESS,
    payload
});

export const updateCommandFail = (error) => ({
    type: types.UPDATE_COMMAND_FAIL,
    error: error,
});

export const deleteCommand = (payload) => ({
    type: types.DELETE_COMMAND_REQUEST,
    payload
});

export const deleteCommandSuccess = (payload) => ({
    type: types.DELETE_COMMAND_SUCCESS,
    payload
});

export const deleteCommandFail = (error) => ({
    type: types.DELETE_COMMAND_FAIL,
    error: error,
});

// Media : Image
export const getImage = ({ taskId, page }) => ({
    type: types.GET_IMAGE_TABPART_REQUEST,
    options: {
        taskId,
        page
    },
});

export const getImageSuccess = (payload, isMore) => ({
    type: types.GET_IMAGE_TABPART_SUCCESS,
    payload,
    isMore
});

export const getImageFail = (error) => ({
    type: types.GET_IMAGE_TABPART_FAIL,
    error: error,
});
// : File
export const getFileTabPart = ({ taskId, page }) => ({
    type: types.GET_FILE_TABPART_REQUEST,
    options: {
        taskId,
        page
    },
});

export const getFileTabPartSuccess = (payload, isMore) => ({
    type: types.GET_FILE_TABPART_SUCCESS,
    payload,
    isMore
});

export const getFileTabPartFail = (error) => ({
    type: types.GET_FILE_TABPART_FAIL,
    error: error,
});
// : Link
export const getLinkTabPart = ({ taskId }) => ({
    type: types.GET_LINK_TABPART_REQUEST,
    options: {
        taskId,
    },
});

export const getLinkTabPartSuccess = (payload) => ({
    type: types.GET_LINK_TABPART_SUCCESS,
    payload
});

export const getLinkTabPartFail = (error) => ({
    type: types.GET_LINK_TABPART_FAIL,
    error: error,
});
// Location
export const getLocationTabPart = ({ taskId }) => ({
    type: types.GET_LOCATION_TABPART_REQUEST,
    options: {
        taskId,
    },
});

export const getLocationTabPartSuccess = (payload) => ({
    type: types.GET_LOCATION_TABPART_SUCCESS,
    payload
});

export const getLocationTabPartFail = (error) => ({
    type: types.GET_LOCATION_TABPART_FAIL,
    error: error,
});

// Task Detail - TabPart - Cot phai
export const getTaskDetailTabPart = ({ taskId }) => ({
    type: types.GET_TASK_DETAIL_TABPART_REQUEST,
    options: {
        taskId,
    },
});

export const getTaskDetailTabPartSuccess = (payload) => ({
    type: types.GET_TASK_DETAIL_TABPART_SUCCESS,
    payload
});

export const getTaskDetailTabPartFail = (error) => ({
    type: types.GET_TASK_DETAIL_TABPART_FAIL,
    error: error,
});

// Update Priority
export const updatePriority = (task_id, priority) => ({
    type: types.UPDATE_TASK_PRIORITY_REQUEST,
    payload: { task_id, priority }
})
export const updatePrioritySuccess = payload => ({
    type: types.UPDATE_TASK_PRIORITY_SUCCESS,
    payload
})
export const updatePriorityFail = error => ({
    type: types.UPDATE_TASK_PRIORITY_FAIL,
    error: error
})
//Member - Tabpart - cot phai
export const getMember = (payload) => ({
    type: types.GET_MEMBER_REQUEST,
    payload
});

export const getMemberSuccess = (payload) => ({
    type: types.GET_MEMBER_SUCCESS,
    payload
});

export const getMemberFail = (error) => ({
    type: types.GET_MEMBER_FAIL,
    error: error,
});

export const getMemberNotAssigned = (payload) => ({
    type: types.GET_MEMBER_NOT_ASSIGNED_REQUEST,
    payload
});

export const getMemberNotAssignedSuccess = (payload) => ({
    type: types.GET_MEMBER_NOT_ASSIGNED_SUCCESS,
    payload
});

export const getMemberNotAssignedFail = (error) => ({
    type: types.GET_MEMBER_NOT_ASSIGNED_FAIL,
    error: error,
});

export const createMember = (payload) => ({
    type: types.POST_MEMBER_REQUEST,
    payload
});

export const createMemberSuccess = (payload) => ({
    type: types.POST_MEMBER_SUCCESS,
    payload
});

export const createMemberFail = (error) => ({
    type: types.POST_MEMBER_FAIL,
    error: error,
});

export const deleteMember = (payload) => ({
    type: types.DELETE_MEMBER_REQUEST,
    payload
});

export const deleteMemberSuccess = (payload) => ({
    type: types.DELETE_MEMBER_SUCCESS,
    payload
});

export const deleteMemberFail = (error) => ({
    type: types.DELETE_MEMBER_FAIL,
    error: error
});
// Member Permission
export const getPermission = (payload) => ({
    type: types.GET_PERMISSION_REQUEST,
    payload
});

export const getPermissionSuccess = (payload) => ({
    type: types.GET_PERMISSION_SUCCESS,
    payload
});

export const getPermissionFail = (error) => ({
    type: types.GET_PERMISSION_FAIL,
    error: error
});

export const updatePermission = (payload) => ({
    type: types.UPDATE_PERMISSION_REQUEST,
    payload
});

export const updatePermissionSuccess = (payload) => ({
    type: types.UPDATE_PERMISSION_SUCCESS,
    payload
});

export const updatePermissionFail = (error) => ({
    type: types.UPDATE_PERMISSION_FAIL,
    error: error
});
// Member Role
export const getRole = (payload) => ({
    type: types.GET_ROLE_REQUEST,
    payload
});

export const getRoleSuccess = (payload) => ({
    type: types.GET_ROLE_SUCCESS,
    payload
});

export const getRoleFail = (error) => ({
    type: types.GET_ROLE_FAIL,
    error: error,
});

export const createRole = (payload) => ({
    type: types.POST_ROLE_REQUEST,
    payload
});

export const createRoleSuccess = (payload) => ({
    type: types.POST_ROLE_SUCCESS,
    payload
});

export const createRoleFail = (error) => ({
    type: types.POST_ROLE_FAIL,
    error: error,
});

export const updateRole = (payload) => ({
    type: types.UPDATE_ROLE_REQUEST,
    payload
});

export const updateRoleSuccess = (payload) => ({
    type: types.UPDATE_ROLE_SUCCESS,
    payload
});

export const updateRoleFail = (error) => ({
    type: types.UPDATE_ROLE_FAIL,
    error: error,
});

export const deleteRole = (payload) => ({
    type: types.DELETE_ROLE_REQUEST,
    payload
});

export const deleteRoleSuccess = (payload) => ({
    type: types.DELETE_ROLE_SUCCESS,
    payload
});

export const deleteRoleFail = (error) => ({
    type: types.DELETE_ROLE_FAIL,
    error: error,
});

export const updateRolesForMember = (payload) => ({
    type: types.UPDATE_ROLES_FOR_MEMBER_REQUEST,
    payload
});

export const updateRolesForMemberSuccess = (payload) => ({
    type: types.UPDATE_ROLES_FOR_MEMBER_SUCCESS,
    payload
});

export const updateRolesForMemberFail = (error) => ({
    type: types.UPDATE_ROLES_FOR_MEMBER_FAIL,
    error: error,
});

//Tien do - time
export const getTrackingTime = (payload) => ({
    type: types.GET_TRACKING_TIME_REQUEST,
    payload
});
export const getTrackingTimeSuccess = (payload) => ({
    type: types.GET_TRACKING_TIME_SUCCESS,
    payload
});
export const getTrackingTimeFail = (error) => ({
    type: types.GET_TRACKING_TIME_FAIL,
    error: error
});
export const getTrackingTimeComplete = (payload) => ({
    type: types.GET_TRACKING_TIME_COMPLETE_REQUEST,
    payload
});
export const getTrackingTimeCompleteSuccess = (payload) => ({
    type: types.GET_TRACKING_TIME_COMPLETE_SUCCESS,
    payload
});
export const getTrackingTimeCompleteFail = (error) => ({
    type: types.GET_TRACKING_TIME_COMPLETE_FAIl,
    error: error
});
export const updateTimeDuration = (payload) => ({
    type: types.UPDATE_TIME_DURATION_REQUEST,
    payload
});
export const updateTimeDurationSuccess = (payload) => ({
    type: types.UPDATE_TIME_DURATION_SUCCESS,
    payload
});
export const updateTimeDurationFail = (error) => ({
    type: types.UPDATE_TIME_DURATION_FAIL,
    error: error
})

// GET LIST GROUP TASK
export const getListGroupTask = (payload) => ({
    type: types.GET_LIST_GROUP_TASK_REQUEST,
    payload
});

export const getListGroupTaskSuccess = (payload) => ({
    type: types.GET_LIST_GROUP_TASK_SUCCESS,
    payload
});

export const getListGroupTaskFail = (error) => ({
    type: types.GET_LIST_GROUP_TASK_FAIL,
    error: error,
});

// GET LIST GROUP OFFER
export const getListOffer = (payload) => ({
    type: types.GET_LIST_OFFER_REQUEST,
    payload
});

export const getListOfferSuccess = (payload) => ({
    type: types.GET_LIST_OFFER_SUCCESS,
    payload
});

export const getListOfferFail = (error) => ({
    type: types.GET_LIST_OFFER_FAIL,
    error: error,
});

// Create Task
export const createTask = (payload) => ({
    type: types.POST_TASK_REQUEST,
    payload
});

export const createTaskSuccess = (payload) => ({
    type: types.POST_TASK_SUCCESS,
    payload
});

export const createTaskFail = (error) => ({
    type: types.POST_TASK_FAIL,
    error: error,
});
// Create Group Task
export const createGroupTask = (payload) => ({
    type: types.POST_GROUP_TASK_REQUEST,
    payload
});

export const createGroupTaskSuccess = (payload) => ({
    type: types.POST_GROUP_TASK_SUCCESS,
    payload
});

export const createGroupTaskFail = (error) => ({
    type: types.POST_GROUP_TASK_FAIL,
    error: error,
});

// Get List Task Detail
export const getListTaskDetail = (project_id, type_data) => ({
    type: types.GET_LIST_TASK_DETAIL_REQUEST,
    project_id, type_data
});

export const getListTaskDetailSuccess = (payload, type_data) => ({
    type: types.GET_LIST_TASK_DETAIL_SUCCESS,
    payload, type_data
});

export const getListTaskDetailFail = (error) => ({
    type: types.GET_LIST_TASK_DETAIL_FAIL,
    error: error
});
//edit name and description task
export const updateNameDescriptionTask = (payload) => ({
    type: types.UPDATE_NAME_DESCRIPTION_TASK_REQUEST,
    payload
});
export const updateNameDescriptionTaskSuccess = (payload) => ({
    type: types.UPDATE_NAME_DESCRIPTION_TASK_SUCCESS,
    payload
});

export const updateNameDescriptionTaskFail = (error) => ({
    type: types.UPDATE_NAME_DESCRIPTION_TASK_FAIL,
    error: error
})
// Get project group- listpart
// export const getProjectGroup = (payload) => ({
//     type: types.GET_PROJECT_GROUP_LISTPART_REQUEST,
//     payload
// });

// export const getProjectGroupSuccess = (payload) => ({
//     type: types.GET_PROJECT_GROUP_LISTPART_SUCCESS,
//     payload
// });

// export const getProjectGroupFail = (error) => ({
//     type: types.GET_PROJECT_GROUP_LISTPART_FAIL,
//     error: error,
// });
// Get project list - list part
// export const getListProject = (payload) => ({
//     type: types.GET_LIST_PROJECT_LISTPART_REQUEST,
//     payload
// });

// export const getListProjectSuccess = (payload) => ({
//     type: types.GET_LIST_PROJECT_LISTPART_SUCCESS,
//     payload
// });

// export const getListProjectFail = (error) => ({
//     type: types.GET_LIST_PROJECT_LISTPART_FAIL,
//     error: error,
// });
// Get project detail
export const getProjectDetail = (payload) => ({
    type: types.GET_PROJECT_DETAIL_REQUEST,
    payload
});

export const getProjectDetailSuccess = (payload) => ({
    type: types.GET_PROJECT_DETAIL_SUCCESS,
    payload
});

export const getProjectDetailFail = (error) => ({
    type: types.GET_PROJECT_DETAIL_FAIL,
    error: error,
});
// Project List Basic - Listpart
export const getProjectListBasic = (payload) => ({
    type: types.GET_PROJECT_LIST_BASIC_REQUEST,
    payload
});

export const getProjectListBasicSuccess = (payload) => ({
    type: types.GET_PROJECT_LIST_BASIC_SUCCESS,
    payload
});

export const getProjectListBasicFail = (error) => ({
    type: types.GET_PROJECT_LIST_BASIC_FAIL,
    error: error,
});
// 

export const chooseProject = payload => ({
    type: types.CHOOSE_PROJECT,
    payload
});

export const chooseTask = payload => ({
    type: types.CHOOSE_TASK,
    payload
});

export const filterTaskByType = payload => ({
    type: types.FILTER_TASK_BY_TYPE,
    payload
});

// Search Task
export const searchTask = payload => ({
    type: types.SEARCH_TASK,
    payload
});
// Search Project
export const searchProject = payload => ({
    type: types.SEARCH_PROJECT,
    payload
})
// Search TabPart
export const searchSubTask = payload => ({
    type: types.SEARCH_SUBTASK_TABPART,
    payload
})
export const searchRemind = payload => ({
    type: types.SEARCH_REMIND_TABPART,
    payload
})
export const searchLocation = payload => ({
    type: types.SEARCH_LOCATION_TABPART,
    payload
})
export const searchImage = payload => ({
    type: types.SEARCH_IMAGES_TABPART,
    payload
})
export const searchFile = payload => ({
    type: types.SEARCH_FILE_TABPART,
    payload
})
export const searchLink = payload => ({
    type: types.SEARCH_LINK_TABPART,
    payload
})
export const searchDemand = payload => ({
    type: types.SEARCH_DEMAND_TABPART,
    payload
})
export const searchOffer = payload => ({
    type: types.SEARCH_OFFER_TABPART,
    payload
})
export const searchMember = payload => ({
    type: types.SEARCH_MEMBER_TABPART,
    payload
})

// Static Task
export const getStaticTask = payload => ({
    type: types.STATIC_TASK_REQUEST,
    payload
})
export const getStaticTaskSuccess = payload => ({
    type: types.STATIC_TASK_SUCCESS,
    payload
})
export const getStaticTaskFail = payload => ({
    type: types.STATIC_TASK_FAIL,
    payload
})
export const updateComplete = payload => ({
    type: types.UPDATE_COMPLETE_REQUEST,
    payload
})
export const updateCompleteSuccess = payload => ({
    type: types.UPDATE_COMPLETE_SUCCESS,
    payload
})
export const updateCompleteFail = error => ({
    type: types.UPDATE_COMPLETE_FAIL,
    error: error
})

// Delete TASK
export const deleteTask = payload => ({
    type: types.DELETE_TASK_REQUEST,
    payload
})
export const deleteTaskSuccess = payload => ({
    type: types.DELETE_TASK_SUCCESS,
    payload
})
export const deleteTaskFail = error => ({
    type: types.DELETE_TASK_FAIL,
    error: error
})

// Pin TASK
export const pinTaskAction = payload => ({
    type: types.PIN_TASK_REQUEST,
    payload
})
export const pinTaskSuccess = (payload, task_id) => ({
    type: types.PIN_TASK_SUCCESS,
    payload, task_id
})
export const pinTaskFail = error => ({
    type: types.PIN_TASK_FAIL,
    error: error
})

// UnPin TASK
export const unPinTaskAction = payload => ({
    type: types.UN_PIN_TASK_REQUEST,
    payload
})
export const unPinTaskSuccess = (payload, task_id) => ({
    type: types.UN_PIN_TASK_SUCCESS,
    payload, task_id
})
export const unPinTaskFail = error => ({
    type: types.UN_PIN_TASK_FAIL,
    error: error
})

export const showTab = payload => ({
    type: types.SET_SHOW_INDEX,
    payload
})

export function stopTask(task_id) {
    return {
        type: types.STOP_TASK,
        task_id
    };
}

export function stopTaskSuccess(payload, task_id) {
    return {
        type: types.STOP_TASK_SUCCESS,
        payload, task_id
    };
}

export function stopTaskFail(error) {
    return {
        type: types.STOP_TASK_FAIL,
        error
    };
}

export function cancelStopTask(task_id) {
    return {
        type: types.CANCEL_STOP_TASK,
        task_id
    };
}

export function cancelStopTaskSuccess(payload, task_id) {
    return {
        type: types.CANCEL_STOP_TASK_SUCCESS,
        payload, task_id
    };
}

export function cancelStopTaskFail(error) {
    return {
        type: types.CANCEL_STOP_TASK_FAIL,
        error
    };
}

export function deleteShareLocation(task_id, location_share_id) {
    return {
        type: types.DELETE_SHARE_LOCATION,
        task_id, location_share_id
    };
}

export function deleteShareLocationSuccess(payload) {
    return {
        type: types.DELETE_SHARE_LOCATION_SUCCESS,
        payload
    };
}

export function deleteShareLocationFail(error) {
    return {
        type: types.DELETE_SHARE_LOCATION_FAIL,
        error
    };
}

export function updateNameDescription(task_id, name, description) {
    return {
        type: types.UPDATE_NAME_DESCRIPTION,
        task_id, name, description
    };
}

export function updateNameDescriptionSuccess(payload, id) {
    return {
        type: types.UPDATE_NAME_DESCRIPTION_SUCCESS,
        payload, id
    };
}

export function updateNameDescriptionFail(error) {
    return {
        type: types.UPDATE_NAME_DESCRIPTION_FAIL,
        error
    };
}

export function updateGroupTask(task_id, group_task) {
    return {
        type: types.UPDATE_GROUP_TASK,
        task_id, group_task
    };
}

export function updateGroupTaskSuccess(payload) {
    return {
        type: types.UPDATE_GROUP_TASK_SUCCESS,
        payload
    };
}

export function updateGroupTaskFail(error) {
    return {
        type: types.UPDATE_GROUP_TASK_FAIL,
        error
    };
}

export function updateTypeAssign(task_id, type_assign) {
    return {
        type: types.UPDATE_TYPE_ASSIGN,
        task_id, type_assign
    };
}

export function updateTypeAssignSuccess(payload) {
    return {
        type: types.UPDATE_TYPE_ASSIGN_SUCCESS,
        payload
    };
}

export function updateTypeAssignFail(error) {
    return {
        type: types.UPDATE_TYPE_ASSIGN_FAIL,
        error
    };
}

export function updateScheduleTask(task_id, schedule_id) {
    return {
        type: types.UPDATE_SCHEDULE_ASSIGN,
        task_id, schedule_id
    };
}

export function updateScheduleTaskSuccess(payload) {
    return {
        type: types.UPDATE_SCHEDULE_ASSIGN_SUCCESS,
        payload
    };
}

export function updateScheduleTaskFail(error) {
    return {
        type: types.UPDATE_SCHEDULE_ASSIGN_FAIL,
        error
    };
}

export function getSchedules(project_id) {
    return {
        type: types.GET_SCHEDULES,
        project_id
    };
}

export function getSchedulesSuccess(payload) {
    return {
        type: types.GET_SCHEDULES_SUCCESS,
        payload
    };
}

export function getSchedulesFail(error) {
    return {
        type: types.GET_SCHEDULES_FAIL,
        error
    };
}

export function updateProjectChat(payload) {
    return {
        type: types.UPDATE_PROJECT_CHAT,
        payload
    };
}

export function removeGroupPermissionOfMember(task_id, member_id) {
    return {
        type: types.REMOVE_GROUP_PERMISSION_OF_MEMBER,
        task_id, member_id
    };
}

export function removeGroupPermissionOfMemberSuccess(payload) {
    return {
        type: types.REMOVE_GROUP_PERMISSION_OF_MEMBER_SUCCESS,
        payload
    };
}

export function removeGroupPermissionOfMemberFail(error) {
    return {
        type: types.REMOVE_GROUP_PERMISSION_OF_MEMBER_FAIL,
        error
    };
}

export function detailGroupPermissionDefault(payload) {
    return {
        type: types.DETAIL_GROUP_PERMISSION_DEFAULT,
        payload
    };
}

export function detailGroupPermissionDefaultSuccess(payload) {
    return {
        type: types.DETAIL_GROUP_PERMISSION_DEFAULT_SUCCESS,
        payload
    };
}

export function detailGroupPermissionDefaultFail(error) {
    return {
        type: types.DETAIL_GROUP_PERMISSION_DEFAULT_FAIL,
        error
    };
}

export function setOpenDetailOffer(isOpenDetail) {
    return {
        type: types.OPEN_DETAIL_OFFER,
        isOpenDetail
    };
}

export function focusTaskGroup(id) {
    return {
        type: types.FOCUS_TASK_GROUP,
        id
    };
}

export function clearFocusTaskGroup(id) {
    return {
        type: types.CLEAR_FOCUS_TASK_GROUP,
        id
    };
}

export function setLocationData(location) {
    return {
        type: types.SET_LOCATION_DATA,
        location
    };
}

export function getTaskMembers(options) {
    return {
        type: types.GET_TASK_MEMBERS,
        options
    };
}

export function getTaskMembersSuccess({members}) {
    return {
        type: types.GET_TASK_MEMBERS_SUCCESS,
        members
    };
}

export function getTaskMembersFail({error}) {
    return {
        type: types.GET_TASK_MEMBERS_FAILED,
        error
    };
}
