import { concat } from 'lodash';
import { createSelector } from 'reselect';

const listLevel = state => state.level.listLevel;
const createLevel = state => state.level.createLevel;
const updateLevel = state => state.level.updateLevel;
const deleteLevel = state => state.level.deleteLevel;

export const levelsSelector = createSelector(
  [listLevel, createLevel, updateLevel, deleteLevel],
  (listLevel, createLevel, updateLevel, deleteLevel) => {
    const { data: { levels }, loading: listLevelLoading, error: listLevelError, firstTime } = listLevel;
    const { loading: createLevelLoading, error: createLevelError } = createLevel;
    const { pendings: updatePendings, error: updateLevelError } = updateLevel;
    const { pendings: deletePendings, error: deleteLevelError } = deleteLevel;

    return {
      levels,
      loading: (firstTime ? false : listLevelLoading) || createLevelLoading,
      error: listLevelError || createLevelError || updateLevelError || deleteLevelError,
      pendings: concat(updatePendings, deletePendings),
      firstTime,
    }
  }
);