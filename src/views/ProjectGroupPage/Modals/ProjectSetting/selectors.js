import { createSelector } from 'reselect';

const detailStatus = state => state.project.setting.detailStatus;
const updateStatusDate = state => state.project.setting.updateStatusDate;
const updateStatusCopy = state => state.project.setting.updateStatusCopy;

export const statusSelector = createSelector(
  [detailStatus, updateStatusDate, updateStatusCopy],
  (detailStatus, updateStatusDate, updateStatusCopy) => {
    const { loading: copyLoading, error: copyError } = updateStatusCopy;
    const { loading: dateLoading, error: dateError } = updateStatusDate;
    const { data: { status }, loading: detailLoading, error: detailError, } = detailStatus;
    return {
      status,
      loading: copyLoading || dateLoading || detailLoading,
      loading: copyError || dateError || detailError,
    }
  }
);