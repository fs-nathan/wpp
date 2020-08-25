import { createSelector } from 'reselect';

const listMajor = state => state.major.listMajor;
const createMajor = state => state.major.createMajor;
const updateMajor = state => state.major.updateMajor;
const deleteMajor = state => state.major.deleteMajor;


export const majorsSelector = createSelector(
  [listMajor, createMajor, updateMajor, deleteMajor],
  (listMajor, createMajor, updateMajor, deleteMajor) => {
    const { data: { majors }, loading: listLoading, error: listError, firstTime } = listMajor;
    const { loading: createLoading, error: createError } = createMajor;
    const { pendings: updatePendings, error: updateError } = updateMajor;
    const { pendings: deletePendings, error: deleteError } = deleteMajor;
    return {
      majors,
      loading: (firstTime ? false : listLoading) || createLoading,
      error: listError || createError || updateError || deleteError,
      updatePendings,
      deletePendings,
      firstTime,
    }
  }
);