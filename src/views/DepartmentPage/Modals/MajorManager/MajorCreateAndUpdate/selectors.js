import { createSelector } from 'reselect';

const createMajor = state => state.major.createMajor;
const updateMajor = state => state.major.updateMajor;

export const activeLoadingSelector = createSelector(
  [createMajor, updateMajor],
  (createMajor, updateMajor) => {
    const { loading: createLoading } = createMajor;
    const { pendings: updatePendings } = updateMajor;
    return createLoading || (updatePendings.length > 0);
  }
);