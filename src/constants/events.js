export const CustomEventEmitter = (EVENT_TYPE) => {
  const customEvent = new Event(EVENT_TYPE);
  window.dispatchEvent(customEvent);
};

export const CustomEventListener = (EVENT_TYPE, handler) => {
  window.addEventListener(EVENT_TYPE, handler);
};

export const CustomEventDispose = (EVENT_TYPE, handler) => {
  window.removeEventListener(EVENT_TYPE, handler);
};

export const LIST_USER_OF_GROUP = {
  SUCCESS: 'EVENT_LIST_USER_OF_GROUP_SUCCESS',
  FAIL: 'EVENT_LIST_USER_OF_GROUP_FAIL',
};

export const GET_USER_OF_ROOM = {
  SUCCESS: 'EVENT_GET_USER_OF_ROOM_SUCCESS',
  FAIL: 'EVENT_GET_USER_OF_ROOM_FAIL',
};

export const LIST_ROOM = {
  SUCCESS: 'EVENT_LIST_ROOM_SUCCESS',
  FAIL: 'EVENT_LIST_ROOM_FAIL',
};
export const DETAIL_ROOM = {
  SUCCESS: 'EVENT_DETAIL_ROOM_SUCCESS',
  FAIL: 'EVENT_DETAIL_ROOM_FAIL',
};
export const CREATE_ROOM = {
  SUCCESS: 'EVENT_CREATE_ROOM_SUCCESS',
  FAIL: 'EVENT_CREATE_ROOM_FAIL',
};
export const DELETE_ROOM = {
  SUCCESS: 'EVENT_DELETE_ROOM_SUCCESS',
  FAIL: 'EVENT_DELETE_ROOM_FAIL',
};
export const UPDATE_ROOM = {
  SUCCESS: 'EVENT_UPDATE_ROOM_SUCCESS',
  FAIL: 'EVENT_UPDATE_ROOM_FAIL',
};
export const SORT_ROOM = {
  SUCCESS: 'EVENT_SORT_ROOM_SUCCESS',
  FAIL: 'EVENT_SORT_ROOM_FAIL',
};
export const SORT_USER = 'EVENT_SORT_USER';
export const UPLOAD_DOCUMENTS_USER = 'EVENT_UPLOAD_DOCUMENTS_USER';
export const DETAIL_USER = {
  SUCCESS: 'EVENT_DETAIL_USER_SUCCESS',
  FAIL: 'EVENT_DETAIL_USER_FAIL',
};
export const UPDATE_USER = {
  SUCCESS: 'EVENT_UPDATE_USER_SUCCESS',
  FAIL: 'EVENT_UPDATE_USER_FAIL',
};
export const LIST_POSITION = {
  SUCCESS: 'EVENT_LIST_POSITION_SUCCESS',
  FAIL: 'EVENT_LIST_POSITION_FAIL',
};
export const CREATE_POSITION = {
  SUCCESS: 'EVENT_CREATE_POSITION_SUCCESS',
  FAIL: 'EVENT_CREATE_POSITION_FAIL',
};
export const UPDATE_POSITION = {
  SUCCESS: 'EVENT_UPDATE_POSITION_SUCCESS',
  FAIL: 'EVENT_UPDATE_POSITION_FAIL',
};
export const DELETE_POSITION = {
  SUCCESS: 'EVENT_DELETE_POSITION_SUCCESS',
  FAIL: 'EVENT_DELETE_POSITION_FAIL',
};
export const LIST_MAJOR = {
  SUCCESS: 'EVENT_LIST_MAJOR_SUCCESS',
  FAIL: 'EVENT_LIST_MAJOR_FAIL',
};
export const CREATE_MAJOR = {
  SUCCESS: 'EVENT_CREATE_MAJOR_SUCCESS',
  FAIL: 'EVENT_CREATE_MAJOR_FAIL',
};
export const UPDATE_MAJOR = {
  SUCCESS: 'EVENT_UPDATE_MAJOR_SUCESS',
  FAIL: 'EVENT_UPDATE_MAJOR_FAIL',
};
export const DELETE_MAJOR = {
  SUCCESS: 'EVENT_DELETE_MAJOR_SUCCESS',
  FAIL: 'EVENT_DELETE_MAJOR_FAIL',
};
export const LIST_LEVEL = {
  SUCCESS: 'EVENT_LIST_LEVEL_SUCCESS',
  FAIL: 'EVENT_LIST_LEVEL_FAIL',
};
export const CREATE_LEVEL = {
  SUCCESS: 'EVENT_CREATE_LEVEL_SUCCESS',
  FAIL: 'EVENT_CREATE_LEVEL_FAIL',
};
export const UPDATE_LEVEL = {
  SUCCESS: 'EVENT_UPDATE_LEVEL_SUCCESS',
  FAIL: 'EVENT_UPDATE_LEVEL_FAIL',
};
export const DELETE_LEVEL = {
  SUCCESS: 'EVENT_DELETE_LEVEL_SUCCESS',
  FAIL: 'EVENT_DELETE_LEVEL_FAIL'
};
export const LIST_USER_ROLE = {
  SUCCESS: 'EVENT_LIST_USER_ROLE_SUCCESS',
  FAIL: 'EVENT_LIST_USER_ROLE_FAIL',
};
export const CREATE_USER_ROLE = {
  SUCCESS: 'EVENT_CREATE_USER_ROLE_SUCCESS',
  FAIL: 'EVENT_CREATE_USER_ROLE_SUCCESS',
};
export const UPDATE_USER_ROLE = {
  SUCCESS: 'EVENT_UPDATE_USER_ROLE_SUCCESS',
  FAIL: 'EVENT_UPDATE_USER_ROLE_FAIL',
};
export const DELETE_USER_ROLE = {
  SUCCESS: 'EVENT_DELETE_USER_ROLE_SUCCESS',
  FAIL: 'EVENT_DELETE_USER_ROLE_FAIL',
};
export const PUBLIC_MEMBER = 'EVENT_PUBLIC_MEMBER';
export const PRIVATE_MEMBER = 'EVENT_PRIVATE_MEMBER';
export const BAN_USER_FROM_GROUP = {
  SUCCESS: 'EVENT_BAN_USER_FROM_GROUP_SUCCESS',
  FAIL: 'EVENT_BAN_USER_FROM_GROUP_FAIL',
};
export const INVITE_USER_JOIN_GROUP = 'EVENT_INVITE_USER_JOIN_GROUP';
export const RESEND_INVITATION_USER_JOIN_GROUP = 'EVENT_RESEND_INVITATION_USER_JOIN_GROUP';
export const CANCLE_INVITATION_JOIN_GROUP = 'EVENT_CANCLE_INVITATION_JOIN_GROUP';
export const ACCEPT_REQUIREMENT_USER_JOIN_GROUP = 'EVENT_ACCEPT_REQUIREMENT_USER_JOIN_GROUP';
export const REJECT_REQUIREMENT_USER_JOIN_GROUP = 'EVENT_REJECT_REQUIREMENT_USER_JOIN_GROUP';
export const CREATE_ICON = 'EVENT_CREATE_ICON';
export const DELETE_ICON = 'EVENT_DELETE_ICON';
export const LIST_PROJECT_GROUP = {
  SUCCESS: 'EVENT_LIST_PROJECT_GROUP_SUCCESS',
  FAIL: 'EVENT_LIST_PROJECT_GROUP_FAIL',
};
export const DETAIL_PROJECT_GROUP = {
  SUCCESS: 'EVENT_DETAIL_PROJECT_GROUP_SUCCESS',
  FAIL: 'EVENT_DETAIL_PROJECT_GROUP_FAIL',
};
export const CREATE_PROJECT_GROUP = {
  SUCCESS: 'EVENT_CREATE_PROJECT_GROUP_SUCCESS',
  FAIL: 'EVENT_CREATE_PROJECT_GROUP_FAIL',
};
export const EDIT_PROJECT_GROUP = {
  SUCCESS: 'EVENT_EDIT_PROJECT_GROUP_SUCCESS',
  FAIL: 'EVENT_EDIT_PROJECT_GROUP_FAIL',
};
export const DELETE_PROJECT_GROUP = {
  SUCCESS: 'EVENT_DELETE_PROJECT_GROUP_SUCCESS',
  FAIL: 'EVENT_DELETE_PROJECT_GROUP_FAIL',
};
export const SORT_PROJECT_GROUP = 'EVENT_SORT_PROJECT_GROUP';
export const LIST_PROJECT = {
  SUCCESS: 'EVENT_LIST_PROJECT_SUCCESS',
  FAIL: 'EVENT_LIST_PROJECT_FAIL',
};
export const DETAIL_PROJECT = {
  SUCCESS: 'EVENT_DETAIL_PROJECT_SUCCESS',
  FAIL: 'EVENT_DETAIL_PROJECT_FAIL',
};
export const CREATE_PROJECT = {
  SUCCESS: 'EVENT_CREATE_PROJECT_SUCCESS',
  FAIL: 'EVENT_CREATE_PROJECT_FAIL',
};
export const COPY_PROJECT = {
  SUCCESS: 'EVENT_COPY_PROJECT_SUCCESS',
  FAIL: 'EVENT_COPY_PROJECT_FAIL',
};
export const SORT_PROJECT = 'EVENT_SORT_PROJECT';
export const UPDATE_PROJECT = {
  SUCCESS: 'EVENT_UPDATE_PROJECT_SUCCESS',
  FAIL: 'EVENT_UPDATE_PROJECT_FAIL',
};
export const DELETE_PROJECT = {
  SUCCESS: 'EVENT_DELETE_PROJECT_SUCCESS',
  FAIL: 'EVENT_DELETE_PROJECT_FAIL',
};
export const DELETE_TRASH_PROJECT = 'EVENT_DELETE_TRASH_PROJECT';
export const RESTORE_TRASH_PROJECT = 'EVENT_RESTORE_TRASH_PROJECT';
export const HIDE_PROJECT = 'EVENT_HIDE_PROJECT';
export const SHOW_PROJECT = 'EVENT_SHOW_PROJECT';
export const MEMBER_PROJECT = {
  SUCCESS: 'EVENT_MEMBER_PROJECT_SUCCESS',
  FAIL: 'EVENT_MEMBER_PROJECT_FAIL',
};
export const ADD_MEMBER_PROJECT = {
  SUCCESS: 'EVENT_ADD_MEMBER_PROJECT_SUCCESS',
  FAIL: 'EVENT_ADD_MEMBER_PROJECT_FAIL',
};
export const REMOVE_MEMBER_PROJECT = {
  SUCCESS: 'EVENT_REMOVE_MEMBER_PROJECT_SUCCESS',
  FAIL: 'EVENT_REMOVE_MEMBER_PROJECT_FAIL',
};
export const UPDATE_STATE_JOIN_TASK = {
  SUCCESS: 'EVENT_UPDATE_STATE_JOIN_TASK_SUCCESS',
  FAIL: 'EVENT_UPDATE_STATE_JOIN_TASK_FAIL',
};
export const ADD_PROJECT_ROLE_TO_MEMBER = {
  SUCCESS: 'EVENT_ADD_PROJECT_ROLE_TO_MEMBER_SUCCESS',
  FAIL: 'EVENT_ADD_PROJECT_ROLE_TO_MEMBER_FAIL',
};
export const REMOVE_PROJECT_ROLE_FROM_MEMBER = {
  SUCCESS: 'EVENT_REMOVE_PROJECT_ROLE_FROM_MEMBER_SUCCESS',
  FAIL: 'EVENT_REMOVE_PROJECT_ROLE_FROM_MEMBER_FAIL',
};
export const DETAIL_STATUS = {
  SUCCESS: 'EVENT_DETAIL_STATUS_SUCCESS',
  FAIL: 'EVENT_DETAIL_STATUS_FAIL',
};
export const UPDATE_STATUS_DATE = {
  SUCCESS: 'EVENT_UPDATE_STATUS_DATE_SUCCESS',
  FAIL: 'EVENT_UPDATE_STATUS_DATE_FAIL',
};
export const UPDATE_STATUS_COPY = {
  SUCCESS: 'EVENT_UPDATE_STATUS_COPY_SUCCESS',
  FAIL: 'EVENT_UPDATE_STATUS_COPY_FAIL',
};
export const UPDATE_STATUS_VIEW = {
  SUCCESS: 'EVENT_UPDATE_STATUS_VIEW_SUCCESS',
  FAIL: 'EVENT_UPDATE_STATUS_VIEW_FAIL',
};
export const UPDATE_GROUP_PERMISSION_MEMBER = {
  SUCCESS: 'EVENT_UPDATE_GROUP_PERMISSION_MEMBER_SUCCESS',
  FAIL: 'EVENT_UPDATE_GROUP_PERMISSION_MEMBER_FAIL',
};
export const ASSIGN_MEMBER_TO_ALL_TASK = {
  SUCCESS: 'EVENT_ASSIGN_MEMBER_TO_ALL_TASK_SUCCESS',
  FAIL: 'EVENT_ASSIGN_MEMBER_TO_ALL_TASK_FAIL',
};
export const LIST_GROUP_TASK = {
  SUCCESS: 'EVENT_LIST_GROUP_TASK_SUCCESS',
  FAIL: 'EVENT_LIST_GROUP_TASK_FAIL',
};
export const GET_ALL_GROUP_TASK = {
  SUCCESS: 'EVENT_GET_ALL_GROUP_TASK_SUCCESS',
  FAIL: 'EVENT_GET_ALL_GROUP_TASK_FAIL',
};
export const CREATE_GROUP_TASK = {
  SUCCESS: 'EVENT_CREATE_GROUP_TASK_SUCCESS',
  FAIL: 'EVENT_CREATE_GROUP_TASK_FAIL',
};
export const COPY_GROUP_TASK = {
  SUCCESS: 'EVENT_COPY_GROUP_TASK_SUCCESS',
  FAIL: 'EVENT_COPY_GROUP_TASK_FAIL',
};
export const UPDATE_GROUP_TASK = {
  SUCCESS: 'EVENT_UPDATE_GROUP_TASK_SUCCESS',
  FAIL: 'EVENT_UPDATE_GROUP_TASK_FAIL',
};
export const DELETE_GROUP_TASK = {
  SUCCESS: 'EVENT_DELETE_GROUP_TASK_SUCCESS',
  FAIL: 'EVENT_DELETE_GROUP_TASK_FAIL',
};
export const SORT_GROUP_TASK = 'EVENT_SORT_GROUP_TASK';
export const CREATE_TASK = 'EVENT_CREATE_TASK';
export const DELETE_TASK = 'EVENT_DELETE_TASK';
export const SORT_TASK = 'EVENT_SORT_TASK';
export const CREATE_WEEKLY_SCHEDULE = "EVENT_CREATE_WEEKLY_SCHEDULE";
export const UPDATE_WEEKLY_SCHEDULE = "EVENT_UPDATE_WEEKLY_SCHEDULE";
export const DELETE_WEEKLY_SCHEDULE = "EVENT_DELETE_WEEKLU_SCHEDULE";
export const CREATE_PROJECT_GROUP_SCHEDULE = "EVENT_CREATE_PROJECT_GROUP_SCHEDULE";
export const UPDATE_PROJECT_GROUP_SCHEDULE = "EVENT_UPDATE_PROJECT_GROUP_SCHEDULE";
export const DELETE_PROJECT_GROUP_SCHEDULE = "EVENT_DELETE_PROJECT_GROUP_SCHEDULE";
export const PROJECT_SCHEDULE_SETTING_START_DAY = "EVENT_PROJECT_SCHEDULE_SETTING_START_DAY";
export const PROJECT_SCHEDULE_ADD_WORKING_DAYS = "EVENT_PROJECT_SCHEDULE_ADD_WORKING_DAYS";
export const PROJECT_SCHEDULE_DELETE_WORKING_DAYS = "EVENT_PROJECT_SCHEDULE_ADD_WORKING_DAYS";
export const PROJECT_SCHEDULE_ADD_DAY_OFF = "EVENT_PROJECT_SCHEDULE_ADD_DAY_OFF";
export const CREATE_PERSONAL_REMIND_CATEGORY = "EVENT_CREATE_PERSONAL_REMIND_CATEGORY";
export const UPDATE_PERSONAL_REMIND_CATEGORY = "EVENT_UPDATE_PERSONAL_REMIND_CATEGORY";
export const SORT_PERSONAL_REMIND_CATEGORY = "EVENT_SORT_PERSONAL_REMIND_CATEGORY";
export const DELETE_PERSONAL_REMIND_CATEGORY = "EVENT_DELETE_PERSONAL_REMIND_CATEGORY";
export const CREATE_PERSONAL_REMIND = "EVENT_CREATE_PERSONAL_REMIND";
export const UPDATE_PERSONAL_REMIND = "EVENT_UPDATE_PERSONAL_REMIND";
export const DELETE_PERSONAL_REMIND = "EVENT_DELETE_PERSONAL_REMIND";
export const PROJECT_SCHEDULE_SETTING_WORKING_DAY = "EVENT_PROJECT_SCHEDULE_SETTING_WORKING_DAY";
export const PROJECT_SCHEDULE_CREATE_SHIFT_STAGE_ALLTIME = "EVENT_PROJECT_SCHEDULE_CREATE_SHIFT_STAGE_ALLTIME";
export const PROJECT_SCHEDULE_DELETE_SHIFT_STAGE_ALLTIME = "EVENT_PROJECT_SCHEDULE_DELETE_SHIFT_STAGE_ALLTIME";
export const PROJECT_SCHEDULE_UPDATE_SHIFT_STAGE_ALLTIME = "EVENT_PROJECT_SCHEDULE_UPDATE_SHIFT_STAGE_ALLTIME";
export const PROJECT_SCHEDULE_CREATE_WORKING_STAGE = "EVENT_PROJECT_SCHEDULE_CREATE_WORKING_STAGE";
export const PROJECT_SCHEDULE_UPDATE_WORKING_STAGE = "EVENT_PROJECT_SCHEDULE_UPDATE_WORKING_STAGE";
export const PROJECT_SCHEDULE_DELETE_WORKING_STAGE = "EVENT_PROJECT_SCHEDULE_DELETE_WORKING_STAGE";
export const PROJECT_SCHEDULE_CREATE_SHIFT_STAGE = "EVENT_PROJECT_SCHEDULE_CREATE_SHIFT_STAGE";
export const PROJECT_SCHEDULE_UPDATE_SHIFT_STAGE = "EVENT_PROJECT_SCHEDULE_CREATE_SHIFT_STAGE";
export const PROJECT_SCHEDULE_DELETE_SHIFT_STAGE = "EVENT_PROJECT_SCHEDULE_CREATE_SHIFT_STAGE";
export const INVITE_OTHER_PEOPLE_CREATE_ACCOUNT = 'EVENT_INVITE_OTHER_PEOPLE_CREATE_ACCOUNT';