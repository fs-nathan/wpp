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

export const SORT_USER = 'EVENT_SORT_USER';
export const CREATE_ROOM = 'EVENT_CREATE_ROOM';
export const DELETE_ROOM = 'EVENT_DELETE_ROOM';
export const UPDATE_ROOM = 'EVENT_UPDATE_ROOM';
export const SORT_ROOM = 'EVENT_SORT_ROOM';
export const UPLOAD_DOCUMENTS_USER = 'EVENT_UPLOAD_DOCUMENTS_USER';
export const UPDATE_USER = 'EVENT_UPDATE_USER';
export const CREATE_POSITION = 'EVENT_CREATE_POSITION';
export const UPDATE_POSITION = 'EVENT_UPDATE_POSITION';
export const DELETE_POSITION = 'EVENT_DELETE_POSITION';
export const CREATE_USER_ROLE = 'EVENT_CREATE_USER_ROLE';
export const UPDATE_USER_ROLE = 'EVENT_UPDATE_USER_ROLE';
export const DELETE_USER_ROLE = 'EVENT_DELETE_USER_ROLE';
export const PUBLIC_MEMBER = 'EVENT_PUBLIC_MEMBER';
export const PRIVATE_MEMBER = 'EVENT_PRIVATE_MEMBER';
export const INVITE_USER_JOIN_GROUP = 'EVENT_INVITE_USER_JOIN_GROUP';
export const BAN_USER_FROM_GROUP = 'EVENT_BAN_USER_FROM_GROUP';
