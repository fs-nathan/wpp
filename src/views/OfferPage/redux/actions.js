import {
  ADD_MEMBER_HANDLE,
  ADD_MEMBER_MONITOR,
  CLOSE_SNACKBAR,
  CREATE_GROUP_OFFER,
  DELETE_DOCUMENT_OFFER,
  DELETE_GROUP_OFFER,
  DELETE_MEMBER_HANDLE,
  DELETE_MEMBER_MONITOR,
  ENQUEUE_SNACKBAR,
  HANDLE_OFFER_OFFERPAGE,
  LOADPAGE_TASK,
  LOADPAGE_TASK_ASSIGN,
  LOADPAGE_TASK_DUE,
  LOADPAGE_TASK_ROLE,
  LOAD_DETAIL_OFFER,
  DELETE_OFFER,
  LOAD_OFFER_BY_DEPARTMENT_ID,
  LOAD_OFFER_BY_GROUP_ID,
  LOAD_OFFER_BY_PROJECT_ID,
  LOAD_SUMMARY_BY_GROUP,
  LOAD_SUMMARY_BY_PROJECT,
  LOAD_SUMMARY_DEPARTMENT,
  LOAD_SUMMARY_OVERVIEW,
  LOAD_TASK_OVERVIEW,
  LOAD_TASK_RENCENTLY,
  REMOVE_SNACKBAR,
  UPDATE_GROUP_OFFER_OFFERPAGE,
  UPLOAD_DOCUMENT_OFFER,
} from './types';

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

export const loadOfferByDepartment = () => {
  return {
    type: LOAD_SUMMARY_DEPARTMENT
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
export const deleteOffer = ({ id }) => {
  return {
    type: DELETE_OFFER,
    payload: { id },
  };
}
export const uploadDocumentOffer = ({ data }) => {
  return {
    type: UPLOAD_DOCUMENT_OFFER,
    payload: { data }
  }
}

export const deleteDocumentOffer = ({ offer_id, file_id }) => {
  return {
    type: DELETE_DOCUMENT_OFFER,
    payload: { offer_id, file_id }
  }
}
export const addMemberHandle = ({ offer_id, member_id }) => {
  return {
    type: ADD_MEMBER_HANDLE,
    payload: { offer_id, member_id }
  }
}
export const deleteMemberHandle = ({ offer_id, member_id }) => {
  return {
    type: DELETE_MEMBER_HANDLE,
    payload: { offer_id, member_id }
  }
}
//
export const addMemberMonitor = ({ offer_id, member_id }) => {
  return {
    type: ADD_MEMBER_MONITOR,
    payload: { offer_id, member_id }
  }
}
export const deleteMemberMonitor = ({ offer_id, member_id }) => {
  return {
    type: DELETE_MEMBER_MONITOR,
    payload: { offer_id, member_id }
  }
}
export const handleOfferOfferPage = ({ offer_id, content, status }) => {
  return {
    type: HANDLE_OFFER_OFFERPAGE,
    payload: { offer_id, content, status }
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
