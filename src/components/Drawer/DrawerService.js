import { apiService } from '../../constants/axiosInstance';

// invitation
export const searchUserService = info => {
  return apiService({ url: '/search-user', method: 'get', params: { info } });
};
export const inviteUserService = user_id => {
  return apiService({
    url: '/invite-user-join-group',
    method: 'post',
    data: { user_id }
  });
};
export const resendInviteUserService = user_id => {
  return apiService({
    url: '/re-send-requirement-join-group',
    method: 'post',
    data: { user_id }
  });
};
export const acceptInviteService = invitation_id => {
  return apiService({
    url: '/accept-invitation-join-group',
    method: 'post',
    data: { invitation_id }
  });
};
export const rejectInviteService = invitation_id => {
  return apiService({
    url: '/reject-invitation-join-group',
    method: 'post',
    data: { invitation_id }
  });
};
export const leaveGroupService = group_id => {
  return apiService({
    url: '/leave-group',
    method: 'post',
    data: { group_id }
  });
};

// group
export const listGroupService = () => {
  return apiService({ url: '/get-list-group', method: 'get' });
};
export const findGroupService = group_code => {
  return apiService({
    url: '/find-group',
    method: 'get',
    params: { group_code }
  });
};
export const requestJoinGroupService = group_id => {
  return apiService({
    url: '/send-requirement-join-group',
    method: 'post',
    data: { group_id }
  });
};
export const requestJoinGroupDemoService = () => {
  return apiService({
    url: '/join-group-demo',
    method: 'post'
  });
};

export const acceptJoinGroupService = requirement_id => {
  return apiService({
    url: '/accept-requirement-join-group',
    method: 'post',
    data: { requirement_id }
  });
};
export const rejectJoinGroupService = requirement_id => {
  return apiService({
    url: '/cancel-requirement-join-group',
    method: 'post',
    data: { requirement_id }
  });
};
export const listJoinRequirementService = () => {
  return apiService({ url: '/get-requirement-join-group', method: 'get' });
};
export const getListNotification = param => {
  const config = {
    url: '/notifications/list',
    method: 'get',
    params: { ...param, type_data: 'html' }
  };
  return apiService(config);
};

export const getViewAllNotification = () => {
  const config = {
    url: '/notifications/view-all-notification',
    method: 'post'
  };
  return apiService(config);
};

export const actionViewNotification = data => {
  const config = {
    url: '/notifications/view-notification',
    method: 'post',
    data
  };
  return apiService(config);
};

export const getListMessage = param => {
  const config = {
    url: '/chat/notifications',
    method: 'get',
    params: { ...param, type_data: 'html' }
  };
  return apiService(config);
};
export const getViewAllMessage = () => {
  const config = {
    url: '/chat/view-all-chat',
    method: 'post'
  };
  return apiService(config);
};

export const actionViewMessage = data => {
  const config = {
    url: '/chat/view-chat',
    method: 'post',
    data
  };
  return apiService(config);
};
