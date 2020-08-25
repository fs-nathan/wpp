import { createSelector } from 'reselect';

const detailStatus = state => state.project.setting.detailStatus;
const updateStatusDate = state => state.project.setting.updateStatusDate;
const updateStatusCopy = state => state.project.setting.updateStatusCopy;
const updateStatusView = state => state.project.setting.updateStatusView;
const updateNotification = state => state.project.setting.updateNotificationSetting;
const viewPermissions = state => state.viewPermissions;

export const statusSelector = createSelector(
  [detailStatus, updateStatusDate, updateStatusCopy, updateStatusView, updateNotification, viewPermissions],
  (detailStatus, updateStatusDate, updateStatusCopy, updateStatusView, updateNotification, viewPermissions) => {
    const { loading: copyLoading, error: copyError } = updateStatusCopy;
    const { loading: dateLoading, error: dateError } = updateStatusDate;
    const { loading: viewLoading, error: viewError } = updateStatusView;
    const { loading: notificationLoading, error: notificationError } = updateNotification;
    const { loading: permissionLoading, error: permissionError } = viewPermissions;
    const { data: { status }, loading: detailLoading, error: detailError, firstTime } = detailStatus;
    return {
      status,
      loading: permissionLoading || copyLoading || dateLoading || viewLoading || notificationLoading || (firstTime ? false : detailLoading),
      error: permissionError || copyError || dateError || viewError || detailError || notificationError,
      firstTime,
    }
  }
);

export const permissionSelector = createSelector(
  [viewPermissions],
  (viewPermissions) => {
    const { data: { detailProject } } = viewPermissions;
    return detailProject;
  }
)