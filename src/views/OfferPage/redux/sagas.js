import { CustomEventEmitter } from "constants/events";
import moment from "moment";
import { put } from "redux-saga/effects";
import { apiService } from "../../../constants/axiosInstance";
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../../constants/snackbarController';
import { ADD_MEMBER_HANDLE_ERROR, ADD_MEMBER_HANDLE_SUCCESS, ADD_MEMBER_MONITOR_SUCCESS, CREATE_GROUP_OFFER_ERROR, CREATE_GROUP_OFFER_SUCCESS, CREATE_OFFER, CREATE_OFFER_SUCCESSFULLY, DELETE_APPROVAL_SUCCESS, DELETE_DOCUMENT_OFFER, DELETE_DOCUMENT_OFFER_SUCCESS, DELETE_GROUP_OFFER_SUCCESS, DELETE_MEMBER_HANDLE_SUCCESS, DELETE_MEMBER_MONITOR_ERROR, DELETE_MEMBER_MONITOR_SUCCESS, DELETE_OFFER_ERROR, DELETE_OFFER_SUCCESSFULLY, ENQUEUE_SNACKBAR, HANDLE_OFFER_OFFERPAGE, LIST_STATUS_HAVE_NEW_OFFER_SUCCESS, LOAD_DETAIL_OFFER_ERROR, LOAD_DETAIL_OFFER_SUCCESS, LOAD_OFFER_BY_DEPARTMENT_ID_SUCCESS, LOAD_OFFER_BY_GROUP_ID_SUCCESS, LOAD_OFFER_BY_PROJECT_ID_SUCCESS, LOAD_SUMMARY_BY_GROUP_SUCCESS, LOAD_SUMMARY_BY_PROJECT_SUCCESS, LOAD_SUMMARY_OVERVIEW_SUCCESS, LOAD_TASK_RECENTLY_SUCCESS, OFFER_DETAIL_GET_COMMENT_LIST_ERROR, OFFER_DETAIL_GET_COMMENT_LIST_SUCCESS, OFFER_DETAIL_POST_COMMENT_ERROR, OFFER_DETAIL_POST_COMMENT_SUCCESS, OFFER_DETAIL_REMOVE_COMMENT_ERROR, OFFER_DETAIL_REMOVE_COMMENT_SUCCESS, OFFER_DETAIL_UPDATE_COMMENT_ERROR, OFFER_DETAIL_UPDATE_COMMENT_SUCCESS, OFFER_GET_MEMBER_TO_ADD_SUCCESS, SORT_GROUP_OFFER_SUCCESS, TASK_OFFER_BY_DEPARTMENT, UPDATE_GROUP_OFFER_OFFERPAGE_ERROR, UPDATE_GROUP_OFFER_OFFERPAGE_SUCCESS, UPDATE_OFFER_APPROVAL_CONDITION_ERROR, UPDATE_OFFER_APPROVAL_CONDITION_SUCCESS, UPDATE_OFFER_DETAIL_DESCRIPTION_SECTION_ERROR, UPDATE_OFFER_DETAIL_DESCRIPTION_SECTION_SUCCESS, UPLOAD_DOCUMENT_OFFER_SUCCESS } from './types';

export function* doGetSummaryByGroup({ payload }) {
  try {
    const config = {
      url: `/offers/summary-group?from_date=${payload.startDate}&to_date=${payload.endDate}`,
      method: "GET"
    };
    const result = yield apiService(config);
    yield put({ type: LOAD_SUMMARY_BY_GROUP_SUCCESS, payload: result.data });
  } catch (err) { }
}

export function* doGetTaskRecently() {
  try {
    const config = {
      url: "/offers/recently",
      method: "GET"
    };
    const result = yield apiService(config);
    yield put({ type: LOAD_TASK_RECENTLY_SUCCESS, payload: result.data });
  } catch (err) { }
}

//
export function* doCreateOfferGroup({ payload }) {
  try {
    const { name, description } = payload;

    const config = {
      url: "/offers/create-group-offer",
      method: "POST",
      data: { name, description }
    };
    const result = yield apiService(config);
    yield put({ type: CREATE_GROUP_OFFER_SUCCESS, payload: result.data });
    yield put({ type: ENQUEUE_SNACKBAR, payload: { message: "Create group offers successful", options: { variant: "success" } } })
  } catch (err) {
    yield put({ type: CREATE_GROUP_OFFER_ERROR, payload: err.message });
    yield put({ type: ENQUEUE_SNACKBAR, payload: { message: err.message, options: { variant: "error" } } })
  }
}
export function* doUpdateGroupOffer({ payload }) {
  try {
    const { name, description, offer_group_id } = payload;
    const config = {
      url: "/offers/update-group-offer",
      method: "PUT",
      data: { name, description, offer_group_id }
    };
    const result = yield apiService(config)
    yield put({ type: UPDATE_GROUP_OFFER_OFFERPAGE_SUCCESS, payload: result.data })
    yield put({ type: ENQUEUE_SNACKBAR, payload: { message: "Update group offers successful", options: { variant: "success" } } })
  } catch (err) {
    yield put({ type: UPDATE_GROUP_OFFER_OFFERPAGE_ERROR, payload: err.message })
    yield put({ type: ENQUEUE_SNACKBAR, payload: { message: err.message, options: { variant: "error" } } })

  }
}

export function* doLoadOfferByGroupID({ payload }) {
  try {
    const { id, startDate, endDate } = payload;
    const config = {
      url: (startDate !== null && endDate !== null) ? `/offers/list-of-group?from_date=${startDate}&to_date=${endDate}&offer_group_id=${id}` : `/offers/list-of-group?offer_group_id=${id}`,
      method: "GET"
    };
    const result = yield apiService(config);
    yield put({ type: LOAD_OFFER_BY_GROUP_ID_SUCCESS, payload: result.data });
  } catch (err) {

  }
}
export function* doLoadSummaryByDepartment({ payload }) {
  try {
    const { timeRange } = payload;
    let startDate = undefined;
    let endDate = undefined;
    if (timeRange.startDate && timeRange.endDate) {
      startDate = moment(timeRange.startDate).format("YYYY-MM-DD")
      endDate = moment(timeRange.endDate).format("YYYY-MM-DD")
    }
    const config = {
      url: `/offers/summary-room?from_date=${startDate}&to_date=${endDate}`,
      method: "GET"
    };
    const result = yield apiService(config);
    yield put({ type: TASK_OFFER_BY_DEPARTMENT, payload: result.data });
  } catch (err) {

  }
}
export function* doLoadOfferByDepartmentID({ payload }) {
  try {
    const { id, startDate, endDate } = payload;
    const config = {
      url: `/offers/list-of-room?from_date=${startDate}&to_date=${endDate}&room_id=${id}`,
      method: "GET"
    };
    const result = yield apiService(config);
    yield put({ type: LOAD_OFFER_BY_DEPARTMENT_ID_SUCCESS, payload: result.data });
  } catch (err) {
  }
}

export function* doLoadSummaryOverview({ payload }) {
  try {
    const { timeRange } = payload;
    let startDate = undefined;
    let endDate = undefined;
    if (timeRange.startDate && timeRange.endDate) {
      startDate = moment(timeRange.startDate).format("YYYY-MM-DD")
      endDate = moment(timeRange.endDate).format("YYYY-MM-DD")
    }
    const config = {
      url: `/offers/summary${
        startDate && endDate
          ? `?from_date=${startDate}&to_date=${endDate}`
          : ''
        }`,
      method: "GET",
    }
    const result = yield apiService(config)
    yield put({ type: LOAD_SUMMARY_OVERVIEW_SUCCESS, payload: result.data })
  } catch (err) {

  }
}

export function* doDeleteGroupOffer({ payload }) {
  try {
    const { id } = payload
    const config = {
      url: "/offers/delete-group-offer",
      method: "DELETE",
      data: { offer_group_id: id }
    }
    yield apiService(config)
    yield put({ type: DELETE_GROUP_OFFER_SUCCESS, payload: id })
    yield put({ type: ENQUEUE_SNACKBAR, payload: { message: "Delete group offers successful", options: { variant: "success" } } })
  } catch (err) {
    yield put({ type: ENQUEUE_SNACKBAR, payload: { message: err.message, options: { variant: "error" } } })
  }
}

export function* doLoadDetailOffer({ payload }) {
  try {
    const { id } = payload
    const config = {
      url: "/offers/detail?offer_id=" + id,
      method: "GET"
    }
    const result = yield apiService(config)
    yield put({ type: LOAD_DETAIL_OFFER_SUCCESS, payload: result.data })
  } catch (err) {
    yield put({ type: LOAD_DETAIL_OFFER_ERROR, payload: err.toString() })
  }
}
export function* doUpdateOfferDetailDescriptionSection({ payload }) {
  try {
    const { offerId, title, content, offerGroupId, priorityCode, additionQuery } = payload
    const config = {
      //url: additionQuery ? `/offers/update-info?${additionQuery}` : "/offers/update-info",
      url: "/offers/update-info",
      method: "POST",
      data: {
        offer_id: offerId,
        title,
        content,
        offer_group_id: offerGroupId,
        priority: priorityCode,
      },
    }
    const result = yield apiService(config);
    yield put({ type: UPDATE_OFFER_DETAIL_DESCRIPTION_SECTION_SUCCESS, payload: result.data });
    CustomEventEmitter(UPDATE_OFFER_DETAIL_DESCRIPTION_SECTION_SUCCESS);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (err) {
    yield put({ type: UPDATE_OFFER_DETAIL_DESCRIPTION_SECTION_ERROR, payload: err.toString() });
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, err.message || DEFAULT_MESSAGE.MUTATE.ERROR);
  }
}
export function* doUpdateOfferApprovalCondition({ payload }) {
  try {
    const { offerId, minRateAccept, conditionLogic, conditionLogicMember, memberAcceptedImportantIds, additionQuery } = payload;
    const dataToSend = {
      offer_id: offerId,
      min_rate_accept: minRateAccept,
      condition_logic: conditionLogic,
    };
    if (conditionLogicMember) {
      dataToSend.condition_logic_member = conditionLogicMember;
      dataToSend.member_accepted_important = memberAcceptedImportantIds;
    }
    const config = {
      //url: additionQuery ? "/offers/update-condition-accept?" + additionQuery : "/offers/update-condition-accept",
      url: "/offers/update-condition-accept",
      method: "POST",
      data: dataToSend,
    }
    const result = yield apiService(config)
    yield put({ type: UPDATE_OFFER_APPROVAL_CONDITION_SUCCESS, payload: result.data })
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (err) {
    yield put({ type: UPDATE_OFFER_APPROVAL_CONDITION_ERROR, payload: err.toString() });
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, err.message || DEFAULT_MESSAGE.MUTATE.ERROR);
  }
}
export function* doGetCommentListOfferDetail({ payload }) {
  try {
    const { offerId, additionQuery } = payload;
    const config = {
      //url: additionQuery ? `/offers/list-comment?offer_id=${offerId}&${additionQuery}` : "/offers/list-comment?offer_id=" + offerId,
      url: "/offers/list-comment?offer_id=" + offerId,
      method: "GET",
    };
    const result = yield apiService(config)
    yield put({ type: OFFER_DETAIL_GET_COMMENT_LIST_SUCCESS, payload: result.data })
  } catch (err) {
    yield put({ type: OFFER_DETAIL_GET_COMMENT_LIST_ERROR, payload: err.toString() })
  }
}
export function* doPostCommentOfferDetail({ payload }) {
  try {
    const { offerId, content, additionQuery } = payload;
    const config = {
      //url: additionQuery ? "/offers/create-comment?" + additionQuery : "/offers/create-comment",
      url: "/offers/create-comment",
      method: "POST",
      data: {
        offer_id: offerId,
        content: content,
      },
    };
    const result = yield apiService(config)
    yield put({ type: OFFER_DETAIL_POST_COMMENT_SUCCESS, payload: result.data })
  } catch (err) {
    yield put({ type: OFFER_DETAIL_POST_COMMENT_ERROR, payload: err.toString() })
  }
}
export function* doUpdateCommentOfferDetail({ payload }) {
  try {
    const { commentId, content, additionQuery } = payload;
    const config = {
      //url: additionQuery ? "/offers/update-comment?" + additionQuery : "/offers/update-comment",
      url: "/offers/update-comment",
      method: "POST",
      data: {
        comment_id: commentId,
        content: content,
      },
    };
    const result = yield apiService(config)
    yield put({ type: OFFER_DETAIL_UPDATE_COMMENT_SUCCESS, payload: result.data })
  } catch (err) {
    yield put({ type: OFFER_DETAIL_UPDATE_COMMENT_ERROR, payload: err.toString() })
  }
}
export function* doRemoveCommentOfferDetail({ payload }) {
  try {
    const { commentId, additionQuery } = payload;
    const config = {
      //url: additionQuery ? "/offers/delete-comment?" + additionQuery : "/offers/delete-comment",
      url: "/offers/delete-comment",
      method: "DELETE",
      data: {
        comment_id: commentId,
      },
    };
    const result = yield apiService(config)
    yield put({ type: OFFER_DETAIL_REMOVE_COMMENT_SUCCESS, payload: { ...result.data, id: commentId } })
  } catch (err) {
    yield put({ type: OFFER_DETAIL_REMOVE_COMMENT_ERROR, payload: err.toString() })
  }
}
export function* doCreateOffer({ payload }) {
  try {
    const { data, additionQuery } = payload;
    const config = {
      url: additionQuery ? "/offers/create?" + additionQuery : "/offers/create",
      method: "POST",
      data: data,
      headers: { 'Content-Type': 'multipart/form-data' },
    };
    const result = yield apiService(config);
    result.data.state && SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
    yield put({ type: CREATE_OFFER_SUCCESSFULLY, payload });
    CustomEventEmitter(CREATE_OFFER_SUCCESSFULLY);
  } catch (err) {
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, err.message || DEFAULT_MESSAGE.MUTATE.ERROR);
  } finally {
    CustomEventEmitter(CREATE_OFFER);
  }
}
export function* doDeleteOffer({ payload }) {
  try {
    const { id } = payload;
    const config = {
      url: "/offers/delete",
      method: "POST",
      data: { offer_id: id }
    };
    const result = yield apiService(config);
    yield put({
      type: DELETE_OFFER_SUCCESSFULLY,
      payload: {
        deletedState: result.data.state,
        offerId: id,
      }
    });
    CustomEventEmitter(DELETE_OFFER_SUCCESSFULLY);
  } catch (err) {
    yield put({ type: DELETE_OFFER_ERROR, payload: err.toString() });
  }
}

export function* doUploadDocumentOffer({ payload }) {
  try {
    const { data, additionQuery } = payload
    const config = {
      //url: additionQuery ? "/offers/upload-documents?" + additionQuery : "/offers/upload-documents",
      url: "/offers/upload-documents",
      method: "POST",
      data: data,
      headers: { 'Content-Type': 'multipart/form-data' }
    }
    const result = yield apiService(config)
    console.log(result.data)
    yield put({ type: UPLOAD_DOCUMENT_OFFER_SUCCESS, payload: result.data })
    yield put({ type: ENQUEUE_SNACKBAR, payload: { message: "Upload document successful", options: { variant: "success" } } })
  } catch (err) {
    yield put({ type: ENQUEUE_SNACKBAR, payload: { message: err.message, options: { variant: "error" } } })
  }
}
export function* doDeleteDocumentOffer({ payload }) {
  try {
    const { file_id, offer_id, additionQuery } = payload
    const config = {
      //url: additionQuery ? "/offers/delete-documents?" + additionQuery : "/offers/delete-documents",
      url: "/offers/delete-documents",
      method: "POST",
      data: { file_id, offer_id }
    }
    yield apiService(config)
    yield put({ type: DELETE_DOCUMENT_OFFER_SUCCESS, payload: { file_id } })
    yield put({ type: ENQUEUE_SNACKBAR, payload: { message: "Delete document successful", options: { variant: "success" } } })
  } catch (err) {
    yield put({ type: ENQUEUE_SNACKBAR, payload: { message: err.message, options: { variant: "error" } } })
  } finally {
    CustomEventEmitter(DELETE_DOCUMENT_OFFER);
  }
}

export function* doAddMemberHandle({ payload }) {
  try {
    const { offer_id, member_id, additionQuery } = payload
    const config = {
      //url: additionQuery ? "/offers/add-member-handle?" + additionQuery : "/offers/add-member-handle",
      url: "/offers/add-member-handle",
      method: "POST",
      data: { offer_id, member_id }
    }
    const result = yield apiService(config)
    yield put({ type: ADD_MEMBER_HANDLE_SUCCESS, payload: result.data })
    yield put({ type: ENQUEUE_SNACKBAR, payload: { message: "Add member handle successful", options: { variant: "success" } } })
  } catch (err) {
    yield put({ type: ADD_MEMBER_HANDLE_ERROR })
    yield put({ type: ENQUEUE_SNACKBAR, payload: { message: err.message, options: { variant: "error" } } })
  }
}
export function* doDeleteMemberHandle({ payload }) {
  try {
    const { offer_id, member_id, additionQuery } = payload
    const config = {
      //url: additionQuery ? "/offers/remove-member-handle?" + additionQuery : "/offers/remove-member-handle",
      url: "/offers/remove-member-handle",
      method: "POST",
      data: { offer_id, member_id }
    }
    yield apiService(config)
    yield put({ type: DELETE_MEMBER_HANDLE_SUCCESS, payload: member_id });
    yield put({ type: ENQUEUE_SNACKBAR, payload: { message: "Delete member handle successful", options: { variant: "success" } } });
    CustomEventEmitter(DELETE_MEMBER_HANDLE_SUCCESS);
  } catch (err) {
    yield put({ type: ENQUEUE_SNACKBAR, payload: { message: err.message, options: { variant: "error" } } })
  }
}
///

export function* doAddMemberMonitor({ payload }) {
  try {
    const { offer_id, member_id, additionQuery } = payload
    const config = {
      //url: additionQuery ? "/offers/add-member-monitor?" + additionQuery : "/offers/add-member-monitor",
      url: "/offers/add-member-monitor",
      method: "POST",
      data: { offer_id, member_id }
    }
    const result = yield apiService(config)
    yield put({ type: ADD_MEMBER_MONITOR_SUCCESS, payload: result.data })
    yield put({ type: ENQUEUE_SNACKBAR, payload: { message: "Add member monitor successful", options: { variant: "success" } } })
  } catch (err) {
    yield put({ type: ENQUEUE_SNACKBAR, payload: { message: err.message, options: { variant: "error" } } })
  }
}
export function* doDeleteMemberMonitor({ payload }) {
  try {
    const { offer_id, member_id, additionQuery } = payload
    const config = {
      //url: additionQuery ? "/offers/remove-member-monitor?" + additionQuery : "/offers/remove-member-monitor",
      url: "/offers/remove-member-monitor",
      method: "POST",
      data: { offer_id, member_id }
    }
    yield apiService(config)
    yield put({ type: DELETE_MEMBER_MONITOR_SUCCESS, payload: member_id });
    yield put({ type: ENQUEUE_SNACKBAR, payload: { message: "Delete member monitor successful", options: { variant: "success" } } });
    CustomEventEmitter(DELETE_MEMBER_MONITOR_SUCCESS);
  } catch (err) {
    yield put({ type: DELETE_MEMBER_MONITOR_ERROR, payload: err.message })
    yield put({ type: ENQUEUE_SNACKBAR, payload: { message: err.message, options: { variant: "error" } } })
  }
}

export function* doHandleOffer({ payload }) {
  try {
    const { content, offer_id, status, additionQuery } = payload
    const config = {
      //url: additionQuery ? "/offers/handle?" + additionQuery : "/offers/handle",
      url: "/offers/handle",
      method: "POST",
      data: { offer_id, status, content }
    }
    const result = yield apiService(config);
    CustomEventEmitter(HANDLE_OFFER_OFFERPAGE);
    yield put({ type: ENQUEUE_SNACKBAR, payload: { message: "Handle offer successful", options: { variant: "success" } } })
  } catch (err) {
    yield put({ type: ENQUEUE_SNACKBAR, payload: { message: err.message, options: { variant: "error" } } })
  }
}
export function* doLoadSummaryProject({ payload }) {
  try {
    const config = {
      url: `/offers/summary-project?from_date=${payload.startDate}&to_date=${payload.endDate}`,
      method: "GET",
    }
    const result = yield apiService(config)
    yield put({ type: LOAD_SUMMARY_BY_PROJECT_SUCCESS, payload: result.data })
  } catch (err) {

  }
}
export function* doLoadOfferByProjectID({ payload }) {
  try {
    const { startDate, endDate, id } = payload
    const config = {
      url: `/offers/list-of-project?from_date=${startDate}&to_date=${endDate}&project_id=` + id
    }
    const result = yield apiService(config)
    yield put({ type: LOAD_OFFER_BY_PROJECT_ID_SUCCESS, payload: result.data })

  } catch (err) {

  }
}

export function* doListStatusHaveNewOffers() {
  try {
    const config = {
      url: "/offers/get-status-have-new-offer-recently"
    }
    const result = yield apiService(config);
    yield put({ type: LIST_STATUS_HAVE_NEW_OFFER_SUCCESS, payload: result.data })
  } catch (err) {

  }
}

export function* doDeleteApproval({ payload }) {
  try {
    const { offer_id, member_id } = payload
    const config = {
      url: `/offers/personal/delete-handle`,
      method: "POST",
      data: { offer_id, member_id }
    }
    const result = yield apiService(config);
    CustomEventEmitter(DELETE_APPROVAL_SUCCESS);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (err) {
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, err.message || DEFAULT_MESSAGE.MUTATE.ERROR);
  }
}

export function* doSortGroupOffer({ payload }) {
  try {
    const { group_offer_id, position } = payload
    const config = {
      url: `/offers/sort-group-offer`,
      method: "POST",
      data: { group_offer_id, position }
    }
    yield apiService(config);
    CustomEventEmitter(SORT_GROUP_OFFER_SUCCESS);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (err) {
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, err.message || DEFAULT_MESSAGE.MUTATE.ERROR);
  }
}

export function* doGetMemberToAdd({ payload }) {
  try {
    const { additionQuery } = payload
    const config = {
      url: additionQuery ? `/offers/get-members-to-add?${additionQuery}` : `/offers/get-members-to-add`,
      method: "GET",
    }
    const result = yield apiService(config);
    yield put({ type: OFFER_GET_MEMBER_TO_ADD_SUCCESS, payload: result.data })
  } catch (err) {
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, err.message || DEFAULT_MESSAGE.MUTATE.ERROR);
  }
}