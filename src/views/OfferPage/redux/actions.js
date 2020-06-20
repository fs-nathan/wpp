import { ADD_MEMBER_HANDLE, ADD_MEMBER_MONITOR, CLOSE_SNACKBAR, CREATE_GROUP_OFFER, CREATE_OFFER, DELETE_APPROVAL, DELETE_DOCUMENT_OFFER, DELETE_GROUP_OFFER, DELETE_MEMBER_HANDLE, DELETE_MEMBER_MONITOR, DELETE_OFFER, ENQUEUE_SNACKBAR, HANDLE_OFFER_OFFERPAGE, LIST_STATUS_HAVE_NEW_OFFER, LOADPAGE_TASK, LOADPAGE_TASK_ASSIGN, LOADPAGE_TASK_DUE, LOADPAGE_TASK_ROLE, LOAD_DETAIL_OFFER, LOAD_OFFER_BY_DEPARTMENT_ID, LOAD_OFFER_BY_GROUP_ID, LOAD_OFFER_BY_PROJECT_ID, LOAD_SUMMARY_BY_GROUP, LOAD_SUMMARY_BY_PROJECT, LOAD_SUMMARY_OFFER_BY_DEPARTMENT, LOAD_SUMMARY_OVERVIEW, LOAD_TASK_OVERVIEW, LOAD_TASK_RENCENTLY, OFFER_DETAIL_GET_COMMENT_LIST, OFFER_DETAIL_POST_COMMENT, OFFER_DETAIL_REMOVE_COMMENT, OFFER_DETAIL_UPDATE_COMMENT, REMOVE_SNACKBAR, SORT_GROUP_OFFER, UPDATE_GROUP_OFFER_OFFERPAGE, UPDATE_OFFER_APPROVAL_CONDITION, UPDATE_OFFER_DETAIL_DESCRIPTION_SECTION, UPLOAD_DOCUMENT_OFFER } from './types';

export const loadTaskPage = timeRange => {
  return {
    type: LOADPAGE_TASK,
    payload: {
      timeRange
    }
  };
};
export const loadTaskOverViewPage = timeRange => {
  return {
    type: LOAD_TASK_OVERVIEW,
    payload: {
      timeRange
    }
  };
};
export const loadTaskDuePage = timeRange => {
  return {
    type: LOADPAGE_TASK_DUE,
    payload: {
      timeRange
    }
  };
};
export const loadTaskAssignPage = timeRange => {
  return {
    type: LOADPAGE_TASK_ASSIGN,
    payload: timeRange
  };
};
export const loadTaskRolePage = timeRange => {
  return {
    type: LOADPAGE_TASK_ROLE,
    payload: timeRange
  };
};

export const listStatusHaveNewOffer = () => {
  return {
    type: LIST_STATUS_HAVE_NEW_OFFER
  }
}

export const loadTaskRencentlyPage = () => {
  return {
    type: LOAD_TASK_RENCENTLY
  };
};
export const loadSummaryByGroup = () => {
  return {
    type: LOAD_SUMMARY_BY_GROUP,
  };
};
export const updateOfferGroup = ({ name, description, offer_group_id }) => {
  return {
    type: UPDATE_GROUP_OFFER_OFFERPAGE,
    payload: { name, description, offer_group_id }
  }
}
export const createOfferGroup = ({ name, description }) => {
  return {
    type: CREATE_GROUP_OFFER,
    payload: { name, description }
  };
};
export const loadOfferByGroupID = ({ id, startDate, endDate }) => {
  return {
    type: LOAD_OFFER_BY_GROUP_ID,
    payload: { id, startDate, endDate }
  };
};

export const loadOfferByDepartment = ({ timeRange }) => {
  return {
    type: LOAD_SUMMARY_OFFER_BY_DEPARTMENT,
    payload: { timeRange }
  }
}

export const loadOfferByDepartmentID = ({ id, startDate, endDate }) => {
  return {
    type: LOAD_OFFER_BY_DEPARTMENT_ID,
    payload: { id, startDate, endDate }
  }
}

export const loadSummaryOverview = ({ timeRange }) => {
  return {
    type: LOAD_SUMMARY_OVERVIEW,
    payload: { timeRange }
  }
}
export const deleteGroupOffer = ({ id }) => {
  return {
    type: DELETE_GROUP_OFFER,
    payload: { id }
  }
}
// Offer Detail
export const loadDetailOffer = ({ id }) => {
  return {
    type: LOAD_DETAIL_OFFER,
    payload: { id }
  }
}
export const updateOfferDetailDescriptionSection = ({ offerId, title, content, offerGroupId, priorityCode, additionQuery }) => {
  return {
    type: UPDATE_OFFER_DETAIL_DESCRIPTION_SECTION,
    payload: { offerId, title, content, offerGroupId, priorityCode, additionQuery }
  }
}
export const updateOfferApprovalCondition = ({
  offerId,
  minRateAccept,
  conditionLogic,
  conditionLogicMember,
  memberAcceptedImportantIds,
  additionQuery
}) => {
  return {
    type: UPDATE_OFFER_APPROVAL_CONDITION,
    payload: { offerId, minRateAccept, conditionLogic, conditionLogicMember, memberAcceptedImportantIds, additionQuery }
  }
}
export const getCommentListOfferDetail = ({ offerId, additionQuery }) => {
  return {
    type: OFFER_DETAIL_GET_COMMENT_LIST,
    payload: { offerId, additionQuery },
  }
};
export const postCommentOfferDetail = ({ offerId, content, additionQuery }) => {
  return {
    type: OFFER_DETAIL_POST_COMMENT,
    payload: { offerId, content, additionQuery },
  }
};
export const updateCommentOfferDetail = ({ commentId, content, additionQuery }) => {
  return {
    type: OFFER_DETAIL_UPDATE_COMMENT,
    payload: { commentId, content, additionQuery },
  }
};
export const removeCommentOfferDetail = ({ commentId, additionQuery }) => {
  return {
    type: OFFER_DETAIL_REMOVE_COMMENT,
    payload: { commentId, additionQuery },
  }
};
export const createOffer = () => ({
  type: CREATE_OFFER,
})
export const deleteOffer = ({ id }) => {
  return {
    type: DELETE_OFFER,
    payload: { id },
  };
}
export const uploadDocumentOffer = ({ data, additionQuery }) => {
  return {
    type: UPLOAD_DOCUMENT_OFFER,
    payload: { data, additionQuery }
  }
}

export const deleteDocumentOffer = ({ offer_id, file_id, additionQuery }) => {
  return {
    type: DELETE_DOCUMENT_OFFER,
    payload: { offer_id, file_id, additionQuery }
  }
}
export const addMemberHandle = ({ offer_id, member_id, additionQuery }) => {
  return {
    type: ADD_MEMBER_HANDLE,
    payload: { offer_id, member_id, additionQuery }
  }
}
export const deleteMemberHandle = ({ offer_id, member_id, additionQuery }) => {
  return {
    type: DELETE_MEMBER_HANDLE,
    payload: { offer_id, member_id, additionQuery }
  }
}
//
export const addMemberMonitor = ({ offer_id, member_id, additionQuery }) => {
  return {
    type: ADD_MEMBER_MONITOR,
    payload: { offer_id, member_id, additionQuery }
  }
}
export const deleteMemberMonitor = ({ offer_id, member_id, additionQuery }) => {
  return {
    type: DELETE_MEMBER_MONITOR,
    payload: { offer_id, member_id }
  }
}
export const handleOfferOfferPage = ({ offer_id, content, status, additionQuery }) => {
  return {
    type: HANDLE_OFFER_OFFERPAGE,
    payload: { offer_id, content, status, additionQuery }
  }
}
export const loadSummaryProject = () => {
  return {
    type: LOAD_SUMMARY_BY_PROJECT
  }
}
export const loadOfferByProjectID = ({ id, startDate, endDate }) => {
  return {
    type: LOAD_OFFER_BY_PROJECT_ID,
    payload: { id, startDate, endDate }
  }
}
export const enqueueSnackbar = (notification) => {
  const key = notification.options && notification.options.key;

  return {
    type: ENQUEUE_SNACKBAR,
    notification: {
      ...notification,
      key: key || new Date().getTime() + Math.random(),
    },
  };
};


export const closeSnackbar = key => ({
  type: CLOSE_SNACKBAR,
  dismissAll: !key,
  key,
});

export const removeSnackbar = key => ({
  type: REMOVE_SNACKBAR,
  key,
});

export const deleteApproval = ({ offer_id, member_id }) => {
  return {
    type: DELETE_APPROVAL,
    payload: { offer_id, member_id }
  }
}

export const sortOfferGroup = ({ group_offer_id, position }) => {
  return {
    type: SORT_GROUP_OFFER,
    payload: { group_offer_id, position }
  }
}