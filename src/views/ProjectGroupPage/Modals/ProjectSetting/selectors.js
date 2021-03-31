import { createSelector } from 'reselect';

const detailStatus = state => state.project.setting.detailStatus;
const updateStatusDate = state => state.project.setting.updateStatusDate;
const updateStatusCopy = state => state.project.setting.updateStatusCopy;
const updateStatusView = state => state.project.setting.updateStatusView;
const updateNotification = state => state.project.setting.updateNotificationSetting;
const updatePinBoard = state => state.project.setting.updatePinBoardSetting;
const viewPermissions = state => state.viewPermissions;

export const statusSelector = createSelector(
  [detailStatus, updateStatusDate, updateStatusCopy, updateStatusView, updateNotification, viewPermissions, updatePinBoard],
  (detailStatus, updateStatusDate, updateStatusCopy, updateStatusView,
   updateNotification, viewPermissions, updatePinBoard) => {
    const { loading: copyLoading, error: copyError } = updateStatusCopy;
    const { loading: dateLoading, error: dateError } = updateStatusDate;
    const { loading: viewLoading, error: viewError } = updateStatusView;
    const { loading: notificationLoading, error: notificationError } = updateNotification;
    const { loading: pinBoardLoading, error: pinBoardError } = updatePinBoard;
    const { loading: permissionLoading, error: permissionError } = viewPermissions;
    const { data: { status }, loading: detailLoading, error: detailError, firstTime } = detailStatus;
    return {
      status,
      loading: permissionLoading || copyLoading || dateLoading || viewLoading || notificationLoading || pinBoardLoading || (firstTime ? false : detailLoading),
      error: permissionError || copyError || dateError || viewError || detailError || notificationError || pinBoardError,
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