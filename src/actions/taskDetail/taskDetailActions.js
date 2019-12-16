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
export const updateSubTask = ({ sub_task_id, name }) => ({
    type: types.UPDATE_SUBTASK_REQUEST,
    options: {
        sub_task_id,
        name
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
export const deleteSubTask = ({ sub_task_id }) => ({
    type: types.DELETE_SUBTASK_REQUEST,
    options: {
        sub_task_id
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
export const completeSubTask = ({ sub_task_id }) => ({
    type: types.POST_COMPLETE_SUBTASK_REQUEST,
    options: {
        sub_task_id
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
export const deleteRemind = (remind_id) => ({
    type: types.DELETE_REMIND_REQUEST,
    payload: remind_id
});

export const deleteRemindSuccess = (remind_id) => ({
    type: types.DELETE_REMIND_SUCCESS,
    payload: remind_id
});

export const deleteRemindFail = (error) => ({
    type: types.DELETE_REMIND_FAIL,
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

export const deleteOfferSuccess = (offer_id) => ({
    type: types.DELETE_OFFER_SUCCESS,
    payload: offer_id
});

export const deleteOfferFail = (error) => ({
    type: types.DELETE_OFFER_FAIL,
    error: error,
});
// ==== upload document to offer
export const uploadDocumentToOffer = (data, cb) => ({
    type: types.UPLOAD_DOCUMENT_TO_OFFER_REQUEST,
    payload: { data, successCallBack: cb }
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
export const deleteDocumentToOffer = (data, cb) => ({
    type: types.DELETE_DOCUMENT_TO_OFFER_REQUEST,
    payload: { data, removeCallBack: cb }
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
export const getImage = ({ taskId }) => ({
    type: types.GET_IMAGE_TABPART_REQUEST,
    options: {
        taskId,
    },
});

export const getImageSuccess = (payload) => ({
    type: types.GET_IMAGE_TABPART_SUCCESS,
    payload
});

export const getImageFail = (error) => ({
    type: types.GET_IMAGE_TABPART_FAIL,
    error: error,
});
// : File
export const getFileTabPart = ({ taskId }) => ({
    type: types.GET_FILE_TABPART_REQUEST,
    options: {
        taskId,
    },
});

export const getFileTabPartSuccess = (payload) => ({
    type: types.GET_FILE_TABPART_SUCCESS,
    payload
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
export const updatePriority = payload => ({
    type: types.UPDATE_TASK_PRIORITY_REQUEST,
    payload
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
    type: types.GET_TRACKING_TIME_FAIl,
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
export const getListTaskDetail = (payload) => ({
    type: types.GET_LIST_TASK_DETAIL_REQUEST,
    payload
});

export const getListTaskDetailSuccess = (payload) => ({
    type: types.GET_LIST_TASK_DETAIL_SUCCESS,
    payload
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

// Get project group- listpart
export const getProjectGroup = (payload) => ({
    type: types.GET_PROJECT_GROUP_LISTPART_REQUEST,
    payload
});

export const getProjectGroupSuccess = (payload) => ({
    type: types.GET_PROJECT_GROUP_LISTPART_SUCCESS,
    payload
});
export const updateNameDescriptionTaskFail = (error) => ({
    type: types.UPDATE_NAME_DESCRIPTION_TASK_FAIL,
    error: error
})

export const getProjectGroupFail = (error) => ({
    type: types.GET_PROJECT_GROUP_LISTPART_FAIL,
    error: error,
});
// Get project list - list part
export const getListProject = (payload) => ({
    type: types.GET_LIST_PROJECT_LISTPART_REQUEST,
    payload
});

export const getListProjectSuccess = (payload) => ({
    type: types.GET_LIST_PROJECT_LISTPART_SUCCESS,
    payload
});

export const getListProjectFail = (error) => ({
    type: types.GET_LIST_PROJECT_LISTPART_FAIL,
    error: error,
});
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
    type: types.SEACRCH_TASK,
    payload
});