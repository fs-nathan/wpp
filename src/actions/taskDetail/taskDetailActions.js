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

export const createOffer = ({ createId, content }) => ({
    type: types.CREATE_OFFER_REQUEST,
    options: {
        createId,
        content
    },
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
    error: error,
});