import { createSelector } from 'reselect';

const detailStatus = state => state.project.setting.detailStatus;
const updateStatusDate = state => state.project.setting.updateStatusDate;
const updateStatusCopy = state => state.project.setting.updateStatusCopy;
const updateStatusView = state => state.project.setting.updateStatusView;
const viewPermissions = state => state.viewPermissions;

export const statusSelector = createSelector(
  [detailStatus, updateStatusDate, updateStatusCopy, updateStatusView, viewPermissions],
  (detailStatus, updateStatusDate, updateStatusCopy, updateStatusView, viewPermissions) => {
    const { loading: copyLoading, error: copyError } = updateStatusCopy;
    const { loading: dateLoading, error: dateError } = updateStatusDate;
    const { loading: viewLoading, error: viewError } = updateStatusView;
    const { loading: permissionLoading, error: permissionError } = viewPermissions;
    const { data: { status }, loading: detailLoading, error: detailError, firstTime } = detailStatus;
    return {
      status,
      loading: permissionLoading || copyLoading || dateLoading || viewLoading || (firstTime ? false : detailLoading),
      error: permissionError || copyError || dateError || viewError || detailError,
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