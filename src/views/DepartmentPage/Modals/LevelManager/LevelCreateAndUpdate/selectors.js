import { createSelector } from 'reselect';

const createLevel = state => state.level.createLevel;
const updateLevel = state => state.level.updateLevel;

export const activeLoadingSelector = createSelector(
  [createLevel, updateLevel],
  (createLevel, updateLevel) => {
    const { loading: createLoading } = createLevel;
    const { pendings: updatePendings } = updateLevel;
    return createLoading || (updatePendings.length > 0);
  }
);