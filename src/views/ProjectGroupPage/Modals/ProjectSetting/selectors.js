import { createSelector } from 'reselect';

const detailStatus = state => state.project.setting.detailStatus;
const updateStatusDate = state => state.project.setting.updateStatusDate;
const updateStatusCopy = state => state.project.setting.updateStatusCopy;
const updateStatusView = state => state.project.setting.updateStatusView;

export const statusSelector = createSelector(
  [detailStatus, updateStatusDate, updateStatusCopy, updateStatusView],
  (detailStatus, updateStatusDate, updateStatusCopy, updateStatusView) => {
    const { loading: copyLoading, error: copyError } = updateStatusCopy;
    const { loading: dateLoading, error: dateError } = updateStatusDate;
    const { loading: viewLoading, error: viewError } = updateStatusView;
    const { data: { status }, loading: detailLoading, error: detailError, } = detailStatus;
    return {
      status,
      loading: copyLoading || dateLoading || viewLoading || detailLoading,
      error: copyError || dateError || viewError || detailError,
    }
  }
);