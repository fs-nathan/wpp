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
// =======
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
// =====
export const updateSubTask = ({ sub_task_id, name}) => ({
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
// =====
export const deleteSubTask = ({sub_task_id}) => ({
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

export const deleteOffer = ({ offer_id }) => ({
    type: types.DELETE_OFFER_REQUEST,
    payload: offer_id
});

export const deleteOfferSuccess = (offer_id) => ({
    type: types.DELETE_OFFER_SUCCESS,
    payload: offer_id
});

export const deleteOfferFail = (error) => ({
    type: types.DELETE_OFFER_FAIL,
    error: error,
});
